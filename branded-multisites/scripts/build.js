import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ejs from "ejs";
import * as sass from "sass";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");

const data = JSON.parse(
  await fs.readFile(path.join(root, "src/data/advisor.json"), "utf8")
);

const sassResult = sass.compile(path.join(root, "src/styles/main.scss"), {
  style: "compressed"
});

for (let i = 1; i <= 10; i++) {
  const designNumber = String(i).padStart(2, "0");
  const templatePath = path.join(root, `src/templates/design-${designNumber}.ejs`);
  const outputDir = path.join(root, `dist/design-${designNumber}`);

  await fs.mkdir(outputDir, { recursive: true });

  const html = await ejs.renderFile(
    templatePath,
    {
      ...data,
      data,
      designNumber
    },
    {
      root: path.join(root, "src/templates"),
      filename: templatePath
    }
  );

  await fs.writeFile(path.join(outputDir, "index.html"), html);
  await fs.writeFile(path.join(outputDir, "styles.css"), sassResult.css);
  await fs.cp(
    path.join(root, "src/assets/images"),
    path.join(outputDir, "assets/images"),
    { recursive: true }
  );
}

console.log("Built 10 advisor designs in /dist");
