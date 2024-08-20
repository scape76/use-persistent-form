"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ShadcnExample } from "./shadcn";
import { BasicExample } from "./basic";
import { useRouter, useSearchParams } from "next/navigation";
import { ExampleTabs } from "./example-tabs";

interface TabberProps {
  code: string;
  codeHTML: string;
}

export function Tabber({ code, codeHTML }: TabberProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const example = searchParams.get("example") ?? "shadcn";

  return (
    <Tabs defaultValue={example}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger
          value="shadcn"
          onClick={() => {
            router.push("/?example=shadcn");
          }}
        >
          Shadcn
        </TabsTrigger>
        <TabsTrigger
          value="basic"
          onClick={() => {
            router.push("/?example=basic");
          }}
        >
          Basic
        </TabsTrigger>
      </TabsList>
      <TabsContent value="shadcn">
        <ExampleTabs
          example={<ShadcnExample />}
          code={code}
          codeHTML={codeHTML}
        />
      </TabsContent>
      <TabsContent value="basic">
        <ExampleTabs
          example={<BasicExample />}
          code={code}
          codeHTML={codeHTML}
        />
      </TabsContent>
    </Tabs>
  );
}
