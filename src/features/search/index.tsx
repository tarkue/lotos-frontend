"use client";
import { useSearchParamSetter } from "@/src/shared/hooks/search-param-setter";
import { Button } from "@/src/shared/ui/button";
import { Icon } from "@/src/shared/ui/icon";
import { Input } from "@/src/shared/ui/input";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export const QUERY_SEARCH_PARAM = "q";

export const QuerySearch = () => {
  const searchParams = useSearchParams();
  const setSearchParam = useSearchParamSetter();
  const defaultValue = searchParams?.get(QUERY_SEARCH_PARAM);
  const [searchValue, setSearchValue] = useState<string>(
    defaultValue ? defaultValue : ""
  );

  const handle = (value: string) => {
    setSearchParam(QUERY_SEARCH_PARAM, value);
    setSearchValue(value);
  };

  return (
    <div className="flex w-full">
      <Input
        placeholder="Поиск"
        className="rounded-l-[16px] rounded-r-none border-r-0"
        value={searchValue}
        onChange={(e) => handle(e.currentTarget.value)}
      />
      <Button
        variant="primary"
        size="icon-small"
        className="rounded-none rounded-l-none rounded-r-[16px] w-11"
      >
        <Icon glyph="search" color="white" />
      </Button>
    </div>
  );
};
