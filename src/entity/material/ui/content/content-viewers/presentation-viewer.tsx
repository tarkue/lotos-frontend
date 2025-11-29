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
    <ul className="w-full flex flex-col gap-6">
      {presentations.map((el, key) => (
        <li key={key} className="w-full flex items-center gap-7">
          <Icon glyph="presentation" color="black" />
          <div className="flex w-full items-center">
            <Typography.Body className="w-full text-balance">
              {el.file.original_filename}
            </Typography.Body>
            <Button
              variant="ghost"
              size="icon-large"
              onClick={() => handleDownload(el)}
            >
              <Icon glyph="download" color="black" size="20" />
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
};
