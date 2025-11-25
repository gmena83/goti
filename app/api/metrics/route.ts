import { NextResponse } from 'next/server';
import { getMetrics } from '@/lib/metrics-service';

export async function GET() {
    try {
        const metrics = await getMetrics();
        return NextResponse.json(metrics);
    } catch (error) {
        console.error('Error in metrics API:', error);
        return NextResponse.json(
            { error: 'Failed to fetch metrics' },
            { status: 500 }
        );
    }
}
