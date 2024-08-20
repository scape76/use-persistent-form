"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";

import { Button, ButtonProps } from "@/components/ui/button";
import { cn, copyToClipboard } from "@/lib/utils";

interface CopyButtonProps extends ButtonProps {
  value: string;
}

export default function CopyButton({
  value,
  className,
  ...props
}: CopyButtonProps) {
  const [hasCopied, setHasCopied] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setHasCopied(false), 2000);

    return () => clearTimeout(timeout);
  }, [hasCopied]);

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className={cn("rounded-sm p-0 hover:bg-background", className)}
      onClick={() => {
        copyToClipboard(value);
        setHasCopied(true);
      }}
      {...props}
    >
      <span className="sr-only">Copy</span>
      {hasCopied ? (
        <Check className="h-3.5 w-3.5" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
    </Button>
  );
}
