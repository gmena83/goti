const fs = require('fs');
const path = require('path');

// All documents to upload
const documents = [
    // Existing tool changelogs
    {
        title: "Lovable - Recent Updates",
        source: "Lovable",
        content: fs.readFileSync(path.join(__dirname, 'docs', 'sample-documents', 'lovable-changelog-nov-2024.md'), 'utf8')
    },
    {
        title: "Zapier - Product Changelog 2024",
        source: "Zapier",
        content: fs.readFileSync(path.join(__dirname, 'docs', 'sample-documents', 'zapier-changelog.md'), 'utf8')
    },
    {
        title: "Activepieces - Recent Releases",
        source: "Activepieces",
        content: fs.readFileSync(path.join(__dirname, 'docs', 'sample-documents', 'activepieces-changelog.md'), 'utf8')
    },
    {
        title: "n8n - Release Notes 2024",
        source: "n8n",
        content: fs.readFileSync(path.join(__dirname, 'docs', 'sample-documents', 'n8n-changelog.md'), 'utf8')
    },
    {
        title: "Stack AI - Changelog",
        source: "Stack AI",
        content: fs.readFileSync(path.join(__dirname, 'docs', 'sample-documents', 'stackai-changelog.md'), 'utf8')
    },
    {
        title: "Supabase - Recent Updates",
        source: "Supabase",
        content: fs.readFileSync(path.join(__dirname, 'docs', 'sample-documents', 'supabase-changelog.md'), 'utf8')
    },
    {
        title: "Bubble - Platform Updates",
        source: "Bubble",
        content: fs.readFileSync(path.join(__dirname, 'docs', 'sample-documents', 'bubble-changelog.md'), 'utf8')
    },
    {
        title: "Replit - Changelog",
        source: "Replit",
        content: fs.readFileSync(path.join(__dirname, 'docs', 'sample-documents', 'replit-changelog.md'), 'utf8')
    },
    {
        title: "Base44 - Updates",
        source: "Base44",
        content: fs.readFileSync(path.join(__dirname, 'docs', 'sample-documents', 'base44-changelog.md'), 'utf8')
    },
    {
        title: "Maker - Platform Updates",
        source: "Maker",
        content: fs.readFileSync(path.join(__dirname, 'docs', 'sample-documents', 'maker-updates.md'), 'utf8')
    },
    {
        title: "Antigravity - Initial Release",
        source: "Antigravity",
        content: fs.readFileSync(path.join(__dirname, 'docs', 'sample-documents', 'antigravity-changelog.md'), 'utf8')
    },
    // Programming language documentation
    {
        title: "Python - Core Language Reference",
        source: "Python Documentation",
        content: fs.readFileSync(path.join(__dirname, 'docs', 'sample-documents', 'python-reference.md'), 'utf8')
    },
    {
        title: "SQL - Database Query Language",
        source: "SQL Documentation",
        content: fs.readFileSync(path.join(__dirname, 'docs', 'sample-documents', 'sql-reference.md'), 'utf8')
    },
    {
        title: "TypeScript - Type-Safe JavaScript",
        source: "TypeScript Documentation",
        content: fs.readFileSync(path.join(__dirname, 'docs', 'sample-documents', 'typescript-reference.md'), 'utf8')
    },
    {
        title: "Speed & Optimization Languages",
        source: "Performance Documentation",
        content: fs.readFileSync(path.join(__dirname, 'docs', 'sample-documents', 'optimization-languages.md'), 'utf8')
    },
    {
        title: "Interaction & Control - AI Communication",
        source: "AI Interaction Documentation",
        content: fs.readFileSync(path.join(__dirname, 'docs', 'sample-documents', 'interaction-control.md'), 'utf8')
    },
    {
        title: "AI Architecture Patterns",
        source: "AI Architecture Documentation",
        content: fs.readFileSync(path.join(__dirname, 'docs', 'sample-documents', 'ai-architecture-patterns.md'), 'utf8')
    }
];

async function uploadAll() {
    console.log('🚀 Starting comprehensive knowledge base upload...\n');

    const results = [];
    for (const doc of documents) {
        try {
            console.log(`📤 Uploading ${doc.source}...`);

            const response = await fetch('http://localhost:3000/api/documents/upload', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(doc)
            });

            const result = await response.json();

            if (response.ok) {
                console.log(`✅ ${doc.source} uploaded! (${result.chunksCount} chunks)`);
                results.push({ tool: doc.source, success: true, chunks: result.chunksCount });
            } else {
                console.error(`❌ ${doc.source} failed:`, result.error);
                results.push({ tool: doc.source, success: false, error: result.error });
            }
        } catch (error) {
            console.error(`❌ ${doc.source} error:`, error.message);
            results.push({ tool: doc.source, success: false, error: error.message });
        }

        // Small delay between uploads
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log('\n📊 Upload Summary:');
    const successful = results.filter(r => r.success).length;
    const totalChunks = results.filter(r => r.success).reduce((sum, r) => sum + r.chunks, 0);
    console.log(`   ✅ Successful: ${successful}/${results.length}`);
    console.log(`   📦 Total Chunks: ${totalChunks}`);
    console.log(`   ❌ Failed: ${results.length - successful}`);

    console.log('\n📝 Details:');
    results.forEach(r => {
        if (r.success) {
            console.log(`   ✅ ${r.tool}: ${r.chunks} chunks`);
        } else {
            console.log(`   ❌ ${r.tool}: ${r.error}`);
        }
    });
}

uploadAll();
