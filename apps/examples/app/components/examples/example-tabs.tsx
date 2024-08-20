import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "../code-block";

interface ExampleTabsProps {
  example: React.ReactNode;
  code: string;
  codeHTML: string;
}

export function ExampleTabs({ example, code, codeHTML }: ExampleTabsProps) {
  return (
    <div>
      <Tabs defaultValue={"preview"}>
        <TabsList className="flex gap-2 bg-background justify-start">
          <TabsTrigger value="preview" variant="underline">
            Preview
          </TabsTrigger>
          <TabsTrigger value="code" variant="underline">
            Code
          </TabsTrigger>
        </TabsList>
        <TabsContent value="preview">{example}</TabsContent>
        <TabsContent value="code">
          <CodeBlock code={code} codeHTML={codeHTML} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
