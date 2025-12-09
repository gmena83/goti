import { NextResponse } from 'next/server';

interface PackageInfo {
    name: string;
    displayName: string;
    npmPackage: string;
    icon: string;
    color: string;
}

const TRACKED_PACKAGES: PackageInfo[] = [
    { name: 'next', displayName: 'Next.js', npmPackage: 'next', icon: 'triangle', color: 'text-orange-400' },
    { name: 'react', displayName: 'React', npmPackage: 'react', icon: 'code', color: 'text-blue-400' },
    { name: 'supabase', displayName: 'Supabase', npmPackage: '@supabase/supabase-js', icon: 'database', color: 'text-green-400' },
    { name: 'typescript', displayName: 'TypeScript', npmPackage: 'typescript', icon: 'code2', color: 'text-cyan-400' },
    { name: 'openai', displayName: 'OpenAI', npmPackage: 'openai', icon: 'brain', color: 'text-purple-400' },
    { name: 'tailwindcss', displayName: 'Tailwind CSS', npmPackage: 'tailwindcss', icon: 'palette', color: 'text-teal-400' },
];

interface NpmRegistryResponse {
    'dist-tags': {
        latest: string;
    };
    time: {
        [version: string]: string;
    };
    versions: {
        [version: string]: {
            description?: string;
        };
    };
}

async function fetchPackageInfo(packageName: string): Promise<{
    version: string;
    publishedAt: string;
    description: string;
} | null> {
    try {
        const response = await fetch(`https://registry.npmjs.org/${encodeURIComponent(packageName)}`, {
            next: { revalidate: 3600 } // Cache for 1 hour
        });

        if (!response.ok) return null;

        const data: NpmRegistryResponse = await response.json();
        const latestVersion = data['dist-tags']?.latest;

        if (!latestVersion) return null;

        const publishedAt = data.time?.[latestVersion] || new Date().toISOString();
        const description = data.versions?.[latestVersion]?.description || '';

        return {
            version: latestVersion,
            publishedAt,
            description
        };
    } catch (error) {
        console.error(`Error fetching ${packageName}:`, error);
        return null;
    }
}

function getTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();

    const minutes = Math.floor(diffMs / 60000);
    const hours = Math.floor(diffMs / 3600000);
    const days = Math.floor(diffMs / 86400000);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);

    if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago`;
    if (weeks > 0) return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
}

export async function GET() {
    try {
        const updates = await Promise.all(
            TRACKED_PACKAGES.map(async (pkg) => {
                const info = await fetchPackageInfo(pkg.npmPackage);

                if (!info) {
                    return {
                        id: pkg.name,
                        name: pkg.displayName,
                        version: 'Unknown',
                        description: 'Unable to fetch package info',
                        timeAgo: 'N/A',
                        icon: pkg.icon,
                        color: pkg.color
                    };
                }

                return {
                    id: pkg.name,
                    name: pkg.displayName,
                    version: info.version,
                    description: info.description || `Latest version of ${pkg.displayName}`,
                    timeAgo: getTimeAgo(info.publishedAt),
                    icon: pkg.icon,
                    color: pkg.color
                };
            })
        );

        // Sort by most recently updated
        updates.sort((a, b) => {
            if (a.timeAgo === 'N/A') return 1;
            if (b.timeAgo === 'N/A') return -1;
            return 0; // Keep npm order for valid entries
        });

        return NextResponse.json({ updates });
    } catch (error) {
        console.error('Error in tool-watch API:', error);
        return NextResponse.json(
            { error: 'Failed to fetch tool updates' },
            { status: 500 }
        );
    }
}
