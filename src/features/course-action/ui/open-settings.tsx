import { CourseProps } from "@/src/entity/course";
import { formatEndpoint } from "@/src/shared/libs/endpoint";
import { Endpoint } from "@/src/shared/models/endpoint-enum";
import { Button } from "@/src/shared/ui/button";
import { useRouter } from "next/navigation";

export const OpenSettings: React.FC<CourseProps> = ({ course }) => {
  const router = useRouter();
  const handle = () => {
    router.push(formatEndpoint(Endpoint.COURSE_SETTINGS_ABOUT, [course.id]));
  };
  return (
    <Button
      size="large"
      variant="primary"
      onClick={handle}
      className="md:w-min w-full"
    >
      Перейти к настройкам
    </Button>
  );
};
