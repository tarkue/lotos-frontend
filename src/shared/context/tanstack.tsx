"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { JSX } from "react";

const queryClient = new QueryClient();

export const TanstackQueryProvider = ({
  children,
}: {
  children?: JSX.Element[] | JSX.Element;
}) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
