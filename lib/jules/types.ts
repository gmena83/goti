/**
 * Jules AI Agent Type Definitions
 * API Reference: https://jules.google.com/docs
 */

/** GitHub repository source connected to Jules */
export interface JulesSource {
    /** Resource name: sources/github/{owner}/{repo} */
    name: string;
    /** Display name of the repository */
    displayName?: string;
    /** GitHub repository URL */
    githubRepoUri?: string;
}

/** Session status enum */
export type SessionStatus =
    | "STATUS_UNSPECIFIED"
    | "INITIALIZING"
    | "GENERATING_PLAN"
    | "WAITING_FOR_PLAN_APPROVAL"
    | "EXECUTING"
    | "WAITING_FOR_USER_INPUT"
    | "COMPLETED"
    | "FAILED"
    | "CANCELLED";

/** A Jules coding session */
export interface JulesSession {
    /** Resource name: sessions/{id} */
    name: string;
    /** User-provided title */
    title?: string;
    /** The task prompt */
    prompt: string;
    /** Current session status */
    status: SessionStatus;
    /** Source context for this session */
    sourceContext?: {
        source: string;
        githubRepoContext?: {
            startingBranch?: string;
        };
    };
    /** Created timestamp */
    createTime?: string;
    /** Last updated timestamp */
    updateTime?: string;
    /** URL to the generated pull request */
    pullRequestUri?: string;
    /** The generated plan (if available) */
    plan?: JulesPlan;
}

/** Jules execution plan */
export interface JulesPlan {
    /** Plan description in markdown */
    description?: string;
    /** List of planned steps */
    steps?: Array<{
        description: string;
        status?: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "FAILED";
    }>;
}

/** Activity/event within a session */
export interface JulesActivity {
    /** Activity type */
    type:
    | "MESSAGE"
    | "PLAN_GENERATED"
    | "PLAN_APPROVED"
    | "CODE_CHANGE"
    | "PR_CREATED"
    | "ERROR";
    /** Timestamp */
    timestamp: string;
    /** Activity message/content */
    message?: string;
    /** Associated metadata */
    metadata?: Record<string, unknown>;
}

/** Options for creating a new session */
export interface CreateSessionOptions {
    /** Task prompt/description (required) */
    prompt: string;
    /** Source name: sources/github/{owner}/{repo} */
    source: string;
    /** Optional session title */
    title?: string;
    /** Starting branch (default: main) */
    startingBranch?: string;
    /** Automation mode */
    automationMode?: "AUTOMATION_MODE_UNSPECIFIED" | "AUTO_CREATE_PR";
    /** Require plan approval before execution */
    requirePlanApproval?: boolean;
}

/** List sources response */
export interface ListSourcesResponse {
    sources: JulesSource[];
    nextPageToken?: string;
}

/** List sessions response */
export interface ListSessionsResponse {
    sessions: JulesSession[];
    nextPageToken?: string;
}

/** List activities response */
export interface ListActivitiesResponse {
    activities: JulesActivity[];
    nextPageToken?: string;
}
