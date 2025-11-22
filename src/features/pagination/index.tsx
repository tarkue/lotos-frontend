"use client";

import { useSearchParamSetter } from "@/src/shared/hooks/search-param-setter";
import Pagination from "@/src/shared/ui/pagination";
import { useSearchParams } from "next/navigation";

export const PAGINATION_SEARCH_PARAM = "p";

export const QueryPagination = ({ total }: { total: number }) => {
  const searchParams = useSearchParams();
  const setSearchParam = useSearchParamSetter();
  const searchParam = searchParams?.get(PAGINATION_SEARCH_PARAM);
  const selected = searchParam ? Number.parseInt(searchParam) : undefined;

  const handle = (currentPage: number) => {
    setSearchParam(PAGINATION_SEARCH_PARAM, currentPage.toString());
  };
  return <Pagination selected={selected} total={total} onSelect={handle} />;
};
