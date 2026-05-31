import { CourseProps } from "@/src/entity/course";
import { formatEndpoint } from "@/src/shared/libs/endpoint";
import { Endpoint } from "@/src/shared/models/endpoint-enum";
import { Tab } from "@/src/shared/ui/tab";
import { useRouter } from "next/navigation";

export const OpenSettings: React.FC<CourseProps> = ({ course }) => {
  const router = useRouter();
  const handle = () => {
    router.push(formatEndpoint(Endpoint.COURSE_SETTINGS_ABOUT, [course.id]));
  };
  return <Tab.Element onClick={handle}>Настройки курса</Tab.Element>;
};
