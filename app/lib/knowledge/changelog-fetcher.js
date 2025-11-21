import * as cheerio from 'cheerio';
import axios from 'axios';

export const ChangelogFetcher = {
    fetchActivepieces: async () => {
        try {
            // Scrape GitHub Releases for Activepieces
            const { data } = await axios.get('https://github.com/activepieces/activepieces/releases');
            const $ = cheerio.load(data);

            // Get the latest release title and body
            const latestRelease = $('.Box-body').first();
            const title = latestRelease.find('.Link--primary').text().trim();
            const body = latestRelease.find('.markdown-body').text().trim().substring(0, 500); // Limit length

            if (!title) return "Activepieces: Could not fetch latest release.";

            return `Activepieces Latest Release (${title}): ${body}...`;
        } catch (error) {
            console.error("Error fetching Activepieces changelog:", error.message);
            return "Activepieces: Error fetching updates.";
        }
    },

    fetchLovable: async () => {
        try {
            // Scrape Lovable Docs Changelog
            // Note: This is a best-guess selector based on typical docs sites (Docusaurus/GitBook etc)
            // We might need to adjust if the structure is complex.
            const { data } = await axios.get('https://docs.lovable.dev/changelog');
            const $ = cheerio.load(data);

            // Assuming standard markdown structure
            const firstEntry = $('main h2').first(); // Usually the date or version
            const content = firstEntry.nextUntil('h2').text().trim().substring(0, 500);
            const title = firstEntry.text().trim();

            if (!title) return "Lovable: Could not fetch latest changelog.";

            return `Lovable Latest Update (${title}): ${content}...`;
        } catch (error) {
            console.error("Error fetching Lovable changelog:", error.message);
            return "Lovable: Error fetching updates.";
        }
    }
};
