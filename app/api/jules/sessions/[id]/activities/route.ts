/**
 * Jules Session Activities API Route
 * GET /api/jules/sessions/[id]/activities - Get session activities/events
 */

import { NextRequest, NextResponse } from "next/server";
import { listActivities } from "@/lib/jules";

interface RouteParams {
    params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;
        const activities = await listActivities(id);
        return NextResponse.json({ activities, success: true });
    } catch (error) {
        console.error("Error fetching Jules session activities:", error);
        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : "Failed to fetch activities",
                success: false,
            },
            { status: 500 }
        );
    }
}
