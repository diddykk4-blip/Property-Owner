const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const html = fs.readFileSync('index.html', 'utf8');
const script = fs.readFileSync('app.js', 'utf8');

const dom = new JSDOM(html, {
    runScripts: 'dangerously',
    resources: 'usable'
});

dom.window.document.addEventListener('error', (e) => {
    console.error('DOM Error:', e.message);
});

dom.window.onerror = function (msg, url, line, col, error) {
    console.error(`JS Error: ${msg} at line ${line}`);
};

// Add script manually to ensure it runs now
const scriptEl = dom.window.document.createElement('script');
scriptEl.textContent = script;
dom.window.document.body.appendChild(scriptEl);

console.log('DOM loaded, executing script...');

setTimeout(() => {
    // try to do some clicks
    try {
        const btnStart = dom.window.document.getElementById('btn-start-app');
        if (btnStart) {
            console.log('Clicking Start App');
            btnStart.click();
        } else {
            console.log('Start App not found');
        }

        const btnNext = dom.window.document.querySelector('.btn-next');
        if (btnNext) {
            console.log('Clicking btn-next');
            btnNext.click();
        } else {
            console.log('btn-next not found');
        }

    } catch (e) {
        console.error('Click error:', e);
    }

    console.log('Done testing.');
}, 1000);
