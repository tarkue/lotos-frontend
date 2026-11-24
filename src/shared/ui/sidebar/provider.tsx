"use client";
import { createContext, useContext, useState } from "react";
import { Sidebar } from "./sidebar";

export interface SidebarContextProps {
  setOpened: (opened: boolean) => void;
  setContent: (children: React.ReactNode) => void;
}

export const SidebarContext = createContext({} as SidebarContextProps);

export interface SidebarProviderProps {
  children?: React.ReactNode;
}

export const SidebarProvider = ({ children }: SidebarProviderProps) => {
  const [sidebarOpened, setOpened] = useState(false);
  const [content, setContent] = useState<React.ReactNode>(undefined);

  const hasSidebar = sidebarOpened && content !== undefined;

  return (
    <SidebarContext.Provider value={{ setOpened, setContent }}>
      <div className={hasSidebar ? "flex w-full flex-col md:flex-row" : undefined}>
        {hasSidebar && <Sidebar>{content}</Sidebar>}
        <div className={hasSidebar ? "w-full min-w-0 px-3 md:px-4" : undefined}>
          {children}
        </div>
      </div>
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
