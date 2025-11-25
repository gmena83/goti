const fs = require('fs');
const path = require('path');
const https = require('https');

async function testOpenAI() {
    try {
        // Read .env.local manually
        const envPath = path.join(__dirname, '.env.local');
        if (!fs.existsSync(envPath)) {
            console.error('Error: .env.local file not found.');
            return;
        }

        const envContent = fs.readFileSync(envPath, 'utf8');
        let apiKey = '';

        envContent.split('\n').forEach(line => {
            const parts = line.split('=');
            if (parts.length >= 2 && parts[0].trim() === 'OPENAI_API_KEY') {
                apiKey = parts.slice(1).join('=').trim();
            }
        });

        if (!apiKey) {
            console.error('Error: OPENAI_API_KEY not found in .env.local');
            return;
        }

        console.log('Testing OpenAI Key...');
        // console.log('Key being used:', apiKey.substring(0, 10) + '...' + apiKey.slice(-5));

        const options = {
            hostname: 'api.openai.com',
            path: '/v1/models',
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        };

        const req = https.request(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                if (res.statusCode === 200) {
                    console.log('✅ OpenAI API Key is valid! Successfully connected to OpenAI.');
                } else {
                    console.error(`❌ OpenAI API connection failed. Status Code: ${res.statusCode}`);
                    try {
                        const errorBody = JSON.parse(data);
                        console.error('Error details:', errorBody.error ? errorBody.error.message : data);
                    } catch (e) {
                        console.error('Error body:', data);
                    }
                }
            });
        });

        req.on('error', (e) => {
            console.error('Request error:', e);
        });

        req.end();

    } catch (err) {
        console.error('Unexpected error:', err);
    }
}

testOpenAI();
