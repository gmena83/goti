/**
 * Jules Sessions API Route
 * GET /api/jules/sessions - List all sessions
 * POST /api/jules/sessions - Create a new coding session
 */

import { NextRequest, NextResponse } from "next/server";
import { listSessions, createSession } from "@/lib/jules";
import type { CreateSessionOptions } from "@/lib/jules";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const sourceFilter = searchParams.get("source") || undefined;

        const sessions = await listSessions(sourceFilter);
        return NextResponse.json({ sessions, success: true });
    } catch (error) {
        console.error("Error fetching Jules sessions:", error);
        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : "Failed to fetch sessions",
                success: false,
            },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate required fields
        if (!body.prompt) {
            return NextResponse.json(
                { error: "prompt is required", success: false },
                { status: 400 }
            );
        }

        if (!body.source) {
            return NextResponse.json(
                { error: "source is required (e.g., sources/github/owner/repo)", success: false },
                { status: 400 }
            );
        }

        const options: CreateSessionOptions = {
            prompt: body.prompt,
            source: body.source,
            title: body.title,
            startingBranch: body.startingBranch || "main",
            automationMode: body.automationMode || "AUTO_CREATE_PR",
            requirePlanApproval: body.requirePlanApproval ?? true,
        };

        const session = await createSession(options);
        return NextResponse.json({ session, success: true }, { status: 201 });
    } catch (error) {
        console.error("Error creating Jules session:", error);
        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : "Failed to create session",
                success: false,
            },
            { status: 500 }
        );
    }
}
