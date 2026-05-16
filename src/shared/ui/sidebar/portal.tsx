"use client";
import { useEffect } from "react";
import { useSidebar } from "./provider";

interface SidebarPortalProps {
  children?: React.ReactNode;
}
export const SidebarPortal = ({ children }: SidebarPortalProps) => {
  const { setOpened, setContent } = useSidebar();
  useEffect(() => {
    if (children === undefined) return;

    setOpened(true);
    setContent(children);

    return () => {
      setOpened(false);
    };
  }, [children, setContent, setOpened]);

  return null;
};
