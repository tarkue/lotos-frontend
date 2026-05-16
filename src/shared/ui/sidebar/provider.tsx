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

  if (!sidebarOpened || content === undefined) {
    return (
      <SidebarContext.Provider value={{ setOpened, setContent }}>
        {children}
      </SidebarContext.Provider>
    );
  }

  return (
    <SidebarContext.Provider value={{ setOpened, setContent }}>
      <div className="w-full h-max flex">
        <Sidebar>{content}</Sidebar>
        <div className="w-full h-max px-4">{children}</div>
      </div>
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
