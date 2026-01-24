"use client";

import { ClientMarkdownContent } from "@/src/shared/ui/markdown-content/client-markdown-content";

export const WrapperText = ({ content }: { content: string }) => {
  return <ClientMarkdownContent content={content} />;
};
