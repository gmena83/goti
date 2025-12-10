/**
 * Jules AI Agent API Client
 * Provides methods to interact with Google's Jules coding agent
 */

import type {
    JulesSource,
    JulesSession,
    JulesActivity,
    CreateSessionOptions,
    ListSourcesResponse,
    ListSessionsResponse,
    ListActivitiesResponse,
} from "./types";

const JULES_API_BASE = "https://jules.googleapis.com/v1alpha";

/**
 * Get the Jules API key from environment
 */
function getApiKey(): string {
    const apiKey = process.env.JULES_API_KEY;
    if (!apiKey) {
        throw new Error("JULES_API_KEY environment variable is not set");
    }
    return apiKey;
}

/**
 * Make an authenticated request to the Jules API
 */
async function julesRequest<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const apiKey = getApiKey();
    const url = `${JULES_API_BASE}${endpoint}`;

    const response = await fetch(url, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": apiKey,
            ...options.headers,
        },
    });

    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(
            `Jules API error (${response.status}): ${response.statusText} - ${errorBody}`
        );
    }

    return response.json();
}

/**
 * List all GitHub repositories connected to Jules
 */
export async function listSources(): Promise<JulesSource[]> {
    const data = await julesRequest<ListSourcesResponse>("/sources");
    return data.sources || [];
}

/**
 * Get a specific source by name
 */
export async function getSource(sourceName: string): Promise<JulesSource> {
    return julesRequest<JulesSource>(`/${sourceName}`);
}

/**
 * Create a new Jules coding session
 */
export async function createSession(
    options: CreateSessionOptions
): Promise<JulesSession> {
    const body = {
        prompt: options.prompt,
        title: options.title,
        sourceContext: {
            source: options.source,
            githubRepoContext: options.startingBranch
                ? { startingBranch: options.startingBranch }
                : undefined,
        },
        automationMode: options.automationMode || "AUTO_CREATE_PR",
        requirePlanApproval: options.requirePlanApproval ?? true,
    };

    return julesRequest<JulesSession>("/sessions", {
        method: "POST",
        body: JSON.stringify(body),
    });
}

/**
 * List all sessions (optionally filtered by source)
 */
export async function listSessions(
    sourceFilter?: string
): Promise<JulesSession[]> {
    const params = sourceFilter ? `?filter=source="${sourceFilter}"` : "";
    const data = await julesRequest<ListSessionsResponse>(`/sessions${params}`);
    return data.sessions || [];
}

/**
 * Get a specific session by name
 */
export async function getSession(sessionName: string): Promise<JulesSession> {
    // sessionName should be like "sessions/abc123"
    const path = sessionName.startsWith("sessions/")
        ? sessionName
        : `sessions/${sessionName}`;
    return julesRequest<JulesSession>(`/${path}`);
}

/**
 * Approve a session's execution plan
 */
export async function approveSessionPlan(sessionName: string): Promise<JulesSession> {
    const path = sessionName.startsWith("sessions/")
        ? sessionName
        : `sessions/${sessionName}`;
    return julesRequest<JulesSession>(`/${path}:approvePlan`, {
        method: "POST",
        body: JSON.stringify({}),
    });
}

/**
 * Cancel a session
 */
export async function cancelSession(sessionName: string): Promise<JulesSession> {
    const path = sessionName.startsWith("sessions/")
        ? sessionName
        : `sessions/${sessionName}`;
    return julesRequest<JulesSession>(`/${path}:cancel`, {
        method: "POST",
        body: JSON.stringify({}),
    });
}

/**
 * List activities/events for a session
 */
export async function listActivities(
    sessionName: string
): Promise<JulesActivity[]> {
    const path = sessionName.startsWith("sessions/")
        ? sessionName
        : `sessions/${sessionName}`;
    const data = await julesRequest<ListActivitiesResponse>(
        `/${path}/activities`
    );
    return data.activities || [];
}

/**
 * Helper to extract session ID from full resource name
 */
export function extractSessionId(sessionName: string): string {
    return sessionName.replace("sessions/", "");
}

/**
 * Helper to format source name from owner/repo
 */
export function formatSourceName(owner: string, repo: string): string {
    return `sources/github/${owner}/${repo}`;
}
