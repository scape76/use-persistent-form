import { CodeBlock } from "@/components/code-block";
import { CopyInstallationButton } from "@/components/copy-installation-button";
import fs from "fs";

export const dynamic = "force-static";

export default async function InstallationPage() {
  const code = await fs.promises.readFile(
    "../../packages/use-persistent-form/src/index.ts",
    "utf-8"
  );

  const html = await fs.promises.readFile("app/generated/hook.html", "utf-8");

  return (
    <main className="container">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl my-6">
        Installation
      </h1>
      <p>To install the package, run the following command:</p>
      <div className="relative mt-2">
        <pre
          className="shiki rose-pine"
          style={{ backgroundColor: "#191724", color: "#e0def4" }}
        >
          <code>
            <span className="line">npm install use-persistent-form</span>
          </code>
        </pre>
        <CopyInstallationButton
          packageName="use-persistent-form"
          className="absolute right-2 top-3"
        />
      </div>
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or</span>
        </div>
      </div>
      <p>Copy & paste this into your app:</p>
      <div className="relative mt-2">
        <CodeBlock code={code} codeHTML={html} />
      </div>
    </main>
  );
}
