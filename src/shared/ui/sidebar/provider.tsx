"use client";
import { createContext, useContext, useState } from "react";

export interface SidebarContextProps {
  setOpened: ((opened: boolean) => void) | undefined;
  setContent: (children: React.ReactNode) => void;
  opened: boolean;
  content: React.ReactNode | undefined;
}

export const SidebarContext = createContext({} as SidebarContextProps);

export interface SidebarProviderProps {
  children?: React.ReactNode;
}

export const SidebarProvider = ({ children }: SidebarProviderProps) => {
  const [sidebarOpened, setOpened] = useState(false);
  const [content, setContent] = useState<React.ReactNode | undefined>(
    undefined,
  );

  return (
    <SidebarContext.Provider
      value={{
        setOpened: sidebarOpened ? setOpened : undefined,
        setContent,
        opened: sidebarOpened,
        content,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
