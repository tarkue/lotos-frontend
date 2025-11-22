"use client";
import { useSearchParamSetter } from "@/src/shared/hooks/search-param-setter";
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
    <Input
      placeholder="Поиск"
      value={searchValue}
      rightIcon={<Icon glyph="search" color="gray" />}
      onChange={(e) => handle(e.currentTarget.value)}
    />
  );
};
