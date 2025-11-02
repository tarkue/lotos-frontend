import { LinkProps as NextLinkProps } from "next/link";
import React from "react";

export interface LinkProps
  extends React.HTMLAttributes<HTMLAnchorElement>,
    NextLinkProps {}
