import { Endpoint } from "@/src/shared/models/endpoint-enum";
import { Container } from "@/src/shared/ui/container";
import { SidebarPortal } from "@/src/shared/ui/sidebar";
import { Tab } from "@/src/shared/ui/tab";
import { Typography } from "@/src/shared/ui/typography";
import Link from "next/link";

export default function AdminPageLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <>
      <SidebarPortal>
        <Typography.Subtitle className="w-full text-black">
          Управление
        </Typography.Subtitle>
        <div className="flex flex-col gap-3 w-full">
          <Link href={Endpoint.ADMINISTRATION_TEACHERS}>
            <Tab.Element>Преподаватели</Tab.Element>
          </Link>
          <Link href={Endpoint.ADMINISTRATION_COURSES}>
            <Tab.Element>Курсы</Tab.Element>
          </Link>
        </div>
      </SidebarPortal>
      <Container
        component="main"
        className="flex flex-col gap-6 mt-9 items-center px-2.5 pb-4 min-h-[calc(100dvh-var(--footer-height-and-padding))] h-max"
      >
        {children}
      </Container>
    </>
  );
}
