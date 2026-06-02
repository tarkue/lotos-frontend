"use client";
import { CourseCardResponseDTO } from "@/src/shared/api/exports";
import { formatEndpoint } from "@/src/shared/libs/endpoint";
import { Endpoint } from "@/src/shared/models/endpoint-enum";
import { SidebarPortal } from "@/src/shared/ui/sidebar";
import { Tab } from "@/src/shared/ui/tab";
import { Typography } from "@/src/shared/ui/typography";
import { useRouter } from "next/navigation";

export const ProgressTeacherSidebar = ({
  courses,
}: {
  courses: CourseCardResponseDTO[];
}) => {
  const router = useRouter();
  const titles = courses.map((el) => el.title);

  const handle = (title: string) => {
    const findedId = courses.find((el) => el.title == title)?.id;
    if (findedId != undefined) {
      router.push(formatEndpoint(Endpoint.PROGRESS_COURSE, [findedId]));
    }
  };

  return (
    <SidebarPortal>
      <div className="flex flex-col w-full gap-4">
        <div className="flex flex-col w-full gap-1">
          <Typography.Caption className="text-light-gray">
            ПРОГРЕСС
          </Typography.Caption>
          <Typography.Subtitle className="text-black">
            По вашим курсам
          </Typography.Subtitle>
        </div>
        <Tab.Map elements={titles} defaultValue={titles[0]} onChange={handle} />
      </div>
    </SidebarPortal>
  );
};
