import type { Metadata } from "next";
import { Tabber } from "./components/examples/tabber";
import fs from "fs";

export const metadata: Metadata = {
  title: "use-persistent-form Examples",
  description:
    "View examples of using use-persistent-form with Shadcn UI and basic HTML forms.",
};

interface HomeProps {
  searchParams: {
    example?: "shadcn" | "basic";
  };
}

export const dynamic = "force-static";

export function generateStaticParams() {
  return [{ example: "shadcn" }, { example: "basic" }];
}

const examples = ["shadcn", "basic"];

export default async function Home({ searchParams }: HomeProps) {
  const selectedExample =
    searchParams.example && examples.includes(searchParams.example)
      ? searchParams.example
      : "shadcn";

  const code = await fs.promises.readFile(
    `./app/codes/${selectedExample}.txt`,
    "utf-8"
  );

  const html = await fs.promises.readFile(
    `./app/generated/${selectedExample}.html`,
    "utf-8"
  );

  return (
    <main className="container">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl my-6">
        Examples
      </h1>
      <Tabber code={code} codeHTML={html} />
    </main>
  );
}
