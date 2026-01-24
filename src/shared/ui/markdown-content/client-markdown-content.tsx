"use client";

import { useEffect, useState } from "react";
import matter from "gray-matter";
import { remark } from "remark";
import remarkBreaks from "remark-breaks";
import html from "remark-html";

export const ClientMarkdownContent = ({ content }: { content: string }) => {
  const [contentHtml, setContentHtml] = useState<string>("");

  useEffect(() => {
    const processMarkdown = async () => {
      const stringifyContent = matter(content).content;

      const processedContent = await remark()
        .use(remarkBreaks)
        .use(html)
        .process(stringifyContent);

      setContentHtml(processedContent.toString());
    };

    processMarkdown();
  }, [content]);

  return (
    <div
      className="markdown-content w-full h-max text-pretty"
      dangerouslySetInnerHTML={{ __html: contentHtml }}
    ></div>
  );
};
