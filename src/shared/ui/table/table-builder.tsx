"use client";

import * as React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/shared/ui/table";
import { cn } from "../../libs/utils";

// Тип для получения типа вложенного свойства по пути
type NestedKeyOf<T> = {
  [K in keyof T & string]: T[K] extends object
    ? `${K}` | `${K}.${NestedKeyOf<T[K]>}`
    : `${K}`;
}[keyof T & string];

type NestedValue<T, K extends string> = K extends `${infer First}.${infer Rest}`
  ? First extends keyof T
    ? T[First] extends object
      ? NestedValue<T[First], Rest>
      : never
    : never
  : K extends keyof T
    ? T[K]
    : never;

// Функция для получения вложенного значения по пути "a.b.c"
function getNestedValue<T extends object, K extends string>(
  obj: T,
  path: K,
): K extends NestedKeyOf<T> ? NestedValue<T, K> : unknown {
  return path.split(".").reduce((current, key) => {
    return current && typeof current === "object"
      ? (current as Record<string, unknown>)[key]
      : undefined;
  }, obj as unknown) as K extends NestedKeyOf<T> ? NestedValue<T, K> : unknown;
}

type Column<T> = {
  key: NestedKeyOf<T>;
  header: string;
  cell?: (value: unknown, row: T) => React.ReactNode;
  variant?: "default" | "danger";
  rowVariant?: (row: T) => "default" | "danger" | undefined;
};

type TableBuilderProps<T extends object> = {
  data: T[];
  columns: Column<T>[];
  action?: React.FC<{ row: T }>;
  emptyMessage?: string;
};

export function TableBuilder<T extends object>({
  data,
  columns,
  action,
  emptyMessage = "Нет данных",
}: TableBuilderProps<T>) {
  const Act = action;
  if (data.length === 0) {
    return (
      <Table>
        <TableBody>
          <TableRow>
            <TableCell
              colSpan={columns.length + (action ? 1 : 0)}
              className="text-center py-8 text-muted-foreground"
            >
              {emptyMessage}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-primary-subtitle">
          {columns.map((column) => (
            <TableHead key={column.key}>{column.header}</TableHead>
          ))}
          {action && <TableHead>Действия</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {columns.map((column) => {
              const value = getNestedValue(row, column.key);
              const variant = column.rowVariant
                ? column.rowVariant(row)
                : column.variant;
              return (
                <TableCell
                  key={column.key}
                  className={cn(
                    "py-5",
                    variant === "danger" &&
                      "bg-status-error text-red font-medium",
                  )}
                >
                  {column.cell
                    ? column.cell(value as NestedValue<T, NestedKeyOf<T>>, row)
                    : String(value ?? "")}
                </TableCell>
              );
            })}
            {action && (
              <TableCell className="text-right">
                <div className="flex justify-center">
                  {Act && <Act row={row} />}
                </div>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
