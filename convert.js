const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const dir = "./assets";

fs.readdirSync(dir).forEach(async file => {

    const ext = path.extname(file).toLowerCase();

    if (
        ext === ".jpg" ||
        ext === ".jpeg" ||
        ext === ".png"
    ) {

        const input = path.join(dir, file);

        const output = path.join(
            dir,
            path.parse(file).name + ".webp"
        );

        await sharp(input)
            .webp({ quality: 80 })
            .toFile(output);

        console.log(`Converted: ${file}`);
    }
});