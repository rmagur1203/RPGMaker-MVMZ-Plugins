const fs = require('fs');
const path = require('path');
const inject = require('injector');

console.assert(process.argv[2] || process.env.INJECTOR_PATH, 'No path to injector provided!');

fs.readdirSync('./lib', {
    withFileTypes: true
}).forEach((dir) => {
    if (dir.isDirectory()) {
        console.log(`Injecting plugin ${dir.name}...`);
        inject.default(
            process.argv[2] || process.env.INJECTOR_PATH,
            path.resolve(__dirname, `../lib/${dir.name}/index.js`),
            path.resolve(__dirname, `../lib/${dir.name}/info.json`),
            path.resolve(__dirname, `../lib/${dir.name}/setup.js`)
        );
    }
});

const _ = process.argv[2] || process.env.INJECTOR_PATH;
const root = fs.existsSync(path.join(_, "www")) ? path.join(_, "www") : _;

if (!fs.existsSync(path.join(root, "cheat"))) {
    if (fs.existsSync(path.join(root, "js", "rpg_core.js"))) {
        fs.copyFileSync("cheat-engine/www/_cheat_initialize/mv/js/main.js", path.join(root, "js", "main.js"));
    } else if (fs.existsSync(path.join(root, "js", "rmmz_core.js"))) {
        fs.copyFileSync("cheat-engine/www/_cheat_initialize/mz/js/main.js", path.join(root, "js", "main.js"));
    } else {
        throw new Error("Unknown RPG Maker version.");
    }
    fs.cpSync("cheat-engine/www/cheat", path.join(root, "cheat"), {
        recursive: true
    });
}