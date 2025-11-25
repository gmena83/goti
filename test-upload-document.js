const fs = require('fs');
const path = require('path');

const testDocument = {
    title: "Lovable Changelog - November 2024",
    source: "Lovable",
    content: fs.readFileSync(
        path.join(__dirname, 'docs', 'sample-documents', 'lovable-changelog-nov-2024.md'),
        'utf8'
    )
};

async function uploadDocument() {
    try {
        console.log('Uploading test document...');

        const response = await fetch('http://localhost:3000/api/documents/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testDocument)
        });

        const result = await response.json();

        if (response.ok) {
            console.log('✅ Document uploaded successfully!');
            console.log('Document ID:', result.documentId);
            console.log('Chunks created:', result.chunksCount);
        } else {
            console.error('❌ Upload failed:', result.error);
            console.error('Details:', result.details);
        }
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

uploadDocument();
