const fs = require('fs');
const { minify } = require("terser");

const files = [
    "./src/js/wm.js",
];

async function compress() {
    let filename = './dist/wm.min.js';
    let originalCode = "";
    files.forEach(js => {
        originalCode += fs.readFileSync(js, 'utf8') + ";\n\n";
    });

    const minifiedCode = await minify(originalCode, {
        output: {
            comments: false // Remove all comments
        }
    });
    fs.writeFileSync(filename, minifiedCode.code);
}

compress();