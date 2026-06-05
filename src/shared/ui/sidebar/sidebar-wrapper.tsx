"use client";
import { MobileSidebar } from "./mobile-sidebar";
import { Sidebar } from "./sidebar";
import { useSidebar } from "./provider";

export const SidebarWrapper = () => {
  const { content } = useSidebar();

  return (
    <>
      {/* Sidebar рендерится только когда есть контент */}
      {content && <Sidebar>{content}</Sidebar>}
      <MobileSidebar />
    </>
  );
};
