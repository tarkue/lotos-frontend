import matter from "gray-matter";
import { remark } from "remark";
import remarkBreaks from "remark-breaks";
import html from "remark-html";

export const MarkdownContent = async ({ content }: { content: string }) => {
  const stringifyContent = matter(content).content;

  const processedContent = await remark()
    .use(remarkBreaks)
    .use(html)
    .process(stringifyContent);

  const contentHtml = processedContent.toString();

  return (
    <div
      className="markdown-content w-full h-max text-pretty"
      dangerouslySetInnerHTML={{ __html: contentHtml }}
    ></div>
  );
};
