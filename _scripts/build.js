const fs = require('fs');
const { minify } = require("terser");

const files = [
    {
        src: ["./src/js/wm.js"],
        dist: "./dist/wm.min.js",
    },
    {
        src: ["./src/js/cm.js"],
        dist: "./dist/cm.min.js",
    }
];

async function compress() {
    for (let item of files) {
        let originalCode = "";
        item.src.forEach(js => {
            originalCode += fs.readFileSync(js, 'utf8') + ";\n\n";
        });
        const minifiedCode = await minify(originalCode, {
            output: {
                comments: false // Remove all comments
            }
        });
        fs.writeFileSync(item.dist, minifiedCode.code);
    }
}

compress();