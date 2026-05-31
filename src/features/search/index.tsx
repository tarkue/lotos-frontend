"use client";
import { useSearchParamSetter } from "@/src/shared/hooks/search-param-setter";
import { Icon } from "@/src/shared/ui/icon";
import { Input } from "@/src/shared/ui/input";
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
    <div className="flex w-full max-w-[280px]">
      <Input
        leftIcon={<Icon glyph="search" color="light-gray" size="20" />}
        placeholder="Поиск"
        className="rounded-l-2xl border-r-0 bg-white"
        value={searchValue}
        onChange={(e) => handle(e.currentTarget.value)}
      />
    </div>
  );
};
