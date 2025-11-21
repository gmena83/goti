import { ChangelogFetcher } from "./changelog-fetcher";

// Simple in-memory cache for context
let cachedContext = "";
let lastFetch = 0;

export const ContextManager = {
    getContext: async () => {
        const now = Date.now();
        // Refresh every hour
        if (now - lastFetch > 3600000 || !cachedContext) {
            console.log("Refreshing knowledge context...");
            const ap = await ChangelogFetcher.fetchActivepieces();
            const lov = await ChangelogFetcher.fetchLovable();

            cachedContext = `
      LATEST CHANGELOGS:
      - ${ap}
      - ${lov}
      `;
            lastFetch = now;
        }
        return cachedContext;
    }
};
