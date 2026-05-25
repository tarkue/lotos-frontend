"use client";
import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { InputProps } from "../input/props";
import { Typography } from "../typography";
import { cn } from "../../libs/utils";
import { Button } from "../button";
import { Icon } from "../icon";

export interface UploadFileProps extends Omit<InputProps, "type" | "size"> {
  onFilesChange?: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
}

export const UploadFile = forwardRef<HTMLDivElement, UploadFileProps>(
  (
    {
      className,
      isValid,
      onFilesChange,
      accept,
      multiple = true,
      maxSize,
      ...props
    },
    ref,
  ) => {
    const [files, setFiles] = useState<File[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const validateFile = useCallback(
      (file: File) => {
        if (maxSize && file.size > maxSize) {
          return false;
        }
        if (accept) {
          const acceptTypes = accept.split(",").map((t) => t.trim());
          if (
            acceptTypes.some((t) => file.type.startsWith(t.replace("/*", "")))
          ) {
            return true;
          }
          if (acceptTypes.includes(file.type)) {
            return true;
          }
        }
        return true;
      },
      [accept, maxSize],
    );

    const handleFiles = useCallback(
      (newFiles: FileList | File[]) => {
        const validFiles = Array.from(newFiles).filter(validateFile);
        setFiles((prevFiles) => {
          const updatedFiles = multiple
            ? [...prevFiles, ...validFiles]
            : validFiles;
          return updatedFiles;
        });
      },
      [multiple, validateFile],
    );

    const removeFile = useCallback((index: number) => {
      setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    }, []);

    const handleDrop = useCallback(
      (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files?.length) {
          handleFiles(e.dataTransfer.files);
        }
      },
      [handleFiles],
    );

    const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback(
      (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
      },
      [],
    );

    const handleClick = useCallback(() => {
      inputRef.current?.click();
    }, []);

    const handleInputChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
          handleFiles(e.target.files);
        }
        e.target.value = "";
      },
      [handleFiles],
    );

    const handlePaste = useCallback(
      (e: React.ClipboardEvent<HTMLDivElement>) => {
        const pastedFiles = e.clipboardData.files;
        if (pastedFiles?.length) {
          handleFiles(pastedFiles);
        }
      },
      [handleFiles],
    );

    useEffect(() => {
      const element = ref && "current" in ref ? ref.current : null;
      if (element) {
        element.addEventListener(
          "paste",
          handlePaste as unknown as EventListener,
        );
        return () => {
          element.removeEventListener(
            "paste",
            handlePaste as unknown as EventListener,
          );
        };
      }
    }, [handlePaste, ref]);

    useEffect(() => {
      onFilesChange?.(files);
    }, [files, onFilesChange]);

    return (
      <div className="flex flex-col gap-3 w-full">
        <div
          className={cn(
            "flex flex-col gap-3 items-center justify-center border-light-gray min-h-[200px] h-[200px] rounded-3xl bg-base-raised relative border border-dashed cursor-pointer transition-colors",
            isDragging && "bg-base-primary/10 border-base-primary",
            isValid === false && "border-error",
            className,
          )}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={handleClick}
          ref={ref}
        >
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept={accept}
            multiple={multiple}
            onChange={handleInputChange}
            {...props}
          />
          <Typography.Body className="text-dark-gray">
            Перетащите файлы, нажмите для выбора или просто вставьте
          </Typography.Body>
          <Typography.Caption className="text-light-gray">
            {accept && `Допустимые форматы: ${accept}. До 10 МБ`}
          </Typography.Caption>
        </div>

        {files.length > 0 && (
          <div className="flex flex-col gap-0 w-full pt-">
            {files.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center bg-base-white rounded px-0"
              >
                <div className="flex items-center gap-2 overflow-hidden text-dark-gray">
                  <Icon glyph="file" size="20" color="dark-gray" />
                  <Typography.Caption className="text-black truncate">
                    {file.name}
                  </Typography.Caption>
                  <Typography.Caption className="text-light-gray whitespace-nowrap">
                    ({(file.size / 1024).toFixed(1)} KB)
                  </Typography.Caption>
                </div>
                <Button
                  onClick={() => removeFile(index)}
                  variant="ghost"
                  size="small"
                >
                  <Icon glyph="close" size="20" color="black" />
                </Button>
              </div>
            ))}
            <Typography.Caption className="text-light-gray pt-2">
              Выбрано файлов: {files.length}
            </Typography.Caption>
          </div>
        )}
      </div>
    );
  },
);
UploadFile.displayName = "UploadFile";
