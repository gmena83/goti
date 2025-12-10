/**
 * Jules Sources API Route
 * GET /api/jules/sources - List connected GitHub repositories
 */

import { NextResponse } from "next/server";
import { listSources } from "@/lib/jules";

export async function GET() {
    try {
        const sources = await listSources();
        return NextResponse.json({ sources, success: true });
    } catch (error) {
        console.error("Error fetching Jules sources:", error);
        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : "Failed to fetch sources",
                success: false,
            },
            { status: 500 }
        );
    }
}
