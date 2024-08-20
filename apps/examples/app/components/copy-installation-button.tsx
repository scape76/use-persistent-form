"use client";

import { Button, type ButtonProps } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { copyToClipboard } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

interface CopyInstallationButtonProps extends ButtonProps {
  packageName: string;
}

export function CopyInstallationButton({
  packageName,
  className,
  ...props
}: CopyInstallationButtonProps) {
  const [hasCopied, setHasCopied] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setHasCopied(false), 2000);

    return () => clearTimeout(timeout);
  }, [hasCopied]);

  const handleCopy = (toCopy: string) => {
    copyToClipboard(toCopy);
    setHasCopied(true);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={className}>
        <Button
          variant="ghost"
          size={"icon"}
          className="text-background h-fit w-fit p-2"
          {...props}
        >
          {hasCopied ? (
            <Check className="size-3" />
          ) : (
            <Copy className="size-3" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32" align="end">
        <DropdownMenuItem
          onClick={() => {
            handleCopy(`npm install ${packageName}`);
          }}
        >
          npm
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            handleCopy(`yarn add ${packageName}`);
          }}
        >
          yarn
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            handleCopy(`pnpm add ${packageName}`);
          }}
        >
          pnpm
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            handleCopy(`bun add ${packageName}`);
          }}
        >
          bun
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
