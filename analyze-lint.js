const fs = require('fs');
const results = JSON.parse(fs.readFileSync('lint-results.json', 'utf8'));
const summary = {};
results.forEach(file => {
    file.messages.forEach(msg => {
        const ruleId = msg.ruleId || 'unknown';
        summary[ruleId] = (summary[ruleId] || 0) + 1;
    });
});
console.log(JSON.stringify(summary, null, 2));
