import { MarkdownContent } from "@/src/shared/ui/markdown-content";

export const MaterialTextViewer = async ({ content }: { content: string }) => {
  return <MarkdownContent content={content} />;
};
