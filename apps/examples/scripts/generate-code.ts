import { codeToHtml } from "shiki";

import fs from "fs";

async function generateCode() {
  const shadcnCode = await fs.promises.readFile("scripts/shadcn.txt", "utf-8");

  const shadncHtml = await codeToHtml(shadcnCode, {
    lang: "tsx",
    theme: "rose-pine",
  });

  const basicCode = await fs.promises.readFile("scripts/basic.txt", "utf-8");

  const basicHtml = await codeToHtml(basicCode, {
    lang: "tsx",
    theme: "rose-pine",
  });

  const hookCode = await fs.promises.readFile(
    "../../packages/use-persistent-form/src/index.ts",
    "utf-8"
  );

  const hookHTML = await codeToHtml(hookCode, {
    lang: "tsx",
    theme: "rose-pine",
  });

  fs.writeFileSync("app/generated/shadcn.html", shadncHtml);
  fs.writeFileSync("app/generated/basic.html", basicHtml);
  fs.writeFileSync("app/generated/hook.html", hookHTML);

  process.exit(0);
}
generateCode().catch((error) => {
  console.error(error);
  process.exit(1);
});
