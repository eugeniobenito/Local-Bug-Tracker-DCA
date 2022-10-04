const prompt = require('prompt-sync')({ sigint: true });

const multiLinePrompt = ask => {
    const lines = ask.split(/\r?\n/);
    const promptLine = lines.pop();
    console.log(lines.join('\n'));
    return prompt(promptLine);
};

module.exports = { multiLinePrompt };