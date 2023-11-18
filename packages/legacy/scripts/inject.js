const fs = require('fs');
const path = require('path');
const inject = require('injector');

fs.readdirSync('./lib', {
    withFileTypes: true
}).forEach((dir) => {
    if (dir.isDirectory()) {
        console.log(`Injecting plugin ${dir.name}...`);
        inject.default(
            process.argv[2],
            path.resolve(__dirname, `../lib/${dir.name}/index.js`),
            path.resolve(__dirname, `../lib/${dir.name}/info.json`),
            path.resolve(__dirname, `../lib/${dir.name}/setup.js`)
        );
    }
});