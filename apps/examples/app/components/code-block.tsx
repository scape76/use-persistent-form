import CopyButton from "./copy-button";

interface CodeBlockProps {
  code: string;
  codeHTML: string;
}

export function CodeBlock({ code, codeHTML }: CodeBlockProps) {
  return (
    <div className="group relative mx-auto">
      <div dangerouslySetInnerHTML={{ __html: codeHTML }} />
      <CopyButton
        value={code}
        className="transition duration-300 opacity-0 group-hover:opacity-100 absolute right-6 top-3"
      />
    </div>
  );
}
