"use client";
import { File } from "@/src/entity/files/models/file";
import { api } from "@/src/shared/api";
import { Button } from "@/src/shared/ui/button";
import { Icon } from "@/src/shared/ui/icon";
import { Typography } from "@/src/shared/ui/typography";

export const MaterialPresentationViewer = ({
  presentations,
}: {
  presentations: File[];
}) => {
  const handleDownload = (file: File) => {
    const link = document.createElement("a");
    link.href = api.getFile(file.file.file_url);
    link.setAttribute("download", file.file.original_filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <ul className="flex w-full flex-col gap-3">
      {presentations.map((el, key) => (
        <li
          key={key}
          className="flex w-full items-center gap-3 rounded-lg border border-base-border py-1 pl-3 pr-1"
        >
          <span className="shrink-0" aria-hidden>
            <Icon glyph="presentation" color="dark-gray" size="20" />
          </span>
          <Typography.Body className="min-w-0 flex-1 [overflow-wrap:anywhere]">
            {el.file.original_filename}
          </Typography.Body>
          <Button
            variant="ghost"
            size="none"
            className="size-11 shrink-0 rounded-lg text-primary hover:bg-base-raised focus-visible:outline-2 focus-visible:outline-primary"
            aria-label={`Скачать ${el.file.original_filename}`}
            onClick={() => handleDownload(el)}
          >
            <Icon glyph="download" color="black" size="20" />
          </Button>
        </li>
      ))}
    </ul>
  );
};
