"use client";
import { useSearchParamSetter } from "@/src/shared/hooks/search-param-setter";
import { Icon } from "@/src/shared/ui/icon";
import { Input } from "@/src/shared/ui/input";
import { X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export const QuerySearch = ({ alias = "q" }: { alias?: string }) => {
  const searchParams = useSearchParams();
  const setSearchParam = useSearchParamSetter();
  const defaultValue = searchParams?.get(alias);
  const [searchValue, setSearchValue] = useState<string>(
    defaultValue ? defaultValue : "",
  );

  const handle = (value: string) => {
    setSearchParam(alias, value);
    setSearchValue(value);
  };

  return (
    <Input
      leftIcon={<Icon glyph="search" color="dark-gray" size="20" />}
      rightIcon={
        searchValue ? (
          <button
            type="button"
            aria-label="Очистить поиск"
            className="-mr-3 grid size-11 shrink-0 cursor-pointer place-items-center rounded-lg text-dark-gray hover:bg-base-raised focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary"
            onClick={() => handle("")}
          >
            <X size={19} aria-hidden />
          </button>
        ) : undefined
      }
      aria-label="Поиск"
      placeholder="Поиск"
      enterKeyHint="search"
      className="min-w-0 w-full bg-white px-3 ring-1 ring-inset ring-base-border focus-within:ring-2 focus-within:ring-primary md:w-[280px]"
      value={searchValue}
      onChange={(e) => handle(e.currentTarget.value)}
    />
  );
};
