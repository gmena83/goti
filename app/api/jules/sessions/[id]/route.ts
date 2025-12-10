/**
 * Jules Session Detail API Route
 * GET /api/jules/sessions/[id] - Get session details
 * POST /api/jules/sessions/[id]/approve - Approve session plan
 * DELETE /api/jules/sessions/[id] - Cancel session
 */

import { NextRequest, NextResponse } from "next/server";
import { getSession, approveSessionPlan, cancelSession } from "@/lib/jules";

interface RouteParams {
    params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;
        const session = await getSession(id);
        return NextResponse.json({ session, success: true });
    } catch (error) {
        console.error("Error fetching Jules session:", error);
        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : "Failed to fetch session",
                success: false,
            },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;
        const { searchParams } = new URL(request.url);
        const action = searchParams.get("action");

        if (action === "approve") {
            const session = await approveSessionPlan(id);
            return NextResponse.json({ session, success: true });
        }

        return NextResponse.json(
            { error: "Invalid action. Use ?action=approve", success: false },
            { status: 400 }
        );
    } catch (error) {
        console.error("Error updating Jules session:", error);
        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : "Failed to update session",
                success: false,
            },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;
        const session = await cancelSession(id);
        return NextResponse.json({ session, success: true });
    } catch (error) {
        console.error("Error cancelling Jules session:", error);
        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : "Failed to cancel session",
                success: false,
            },
            { status: 500 }
        );
    }
}
