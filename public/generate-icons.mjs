import sharp from "sharp";
import { mkdirSync } from "fs";

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const source = "./public/icon-source.png"; // taruh icon 512x512 disini

mkdirSync("./public/icons", { recursive: true });

for (const size of sizes) {
  await sharp(source)
    .resize(size, size)
    .toFile(`./public/icons/icon-${size}x${size}.png`);
  console.log(`✓ icon-${size}x${size}.png`);
}
