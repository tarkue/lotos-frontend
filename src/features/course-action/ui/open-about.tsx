import { CourseProps } from "@/src/entity/course";
import { formatEndpoint } from "@/src/shared/libs/endpoint";
import { Endpoint } from "@/src/shared/models/endpoint-enum";
import { Button } from "@/src/shared/ui/button";
import { Icon } from "@/src/shared/ui/icon";
import { Tab } from "@/src/shared/ui/tab";
import { useRouter } from "next/navigation";

export const OpenAbout: React.FC<
  CourseProps & { variant?: "button" | "tab" }
> = ({ course, variant = "tab" }) => {
  const router = useRouter();
  const handle = () => {
    router.push(formatEndpoint(Endpoint.COURSE, [course.id]));
  };
  if (variant === "button") {
    return (
      <Button variant="primary" onClick={handle}>
        Перейти
      </Button>
    );
  }
  return <Tab.Element onClick={handle}>О курсе</Tab.Element>;
};
