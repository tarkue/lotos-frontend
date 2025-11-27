import { CourseDescription, CourseProps } from "@/src/entity/course";
import { ModuleList } from "@/src/entity/module";
import { BackButton } from "@/src/features/back";
import { CourseAction } from "@/src/features/course-action";
import { Endpoint } from "@/src/shared/models/endpoint-enum";

export const Course = ({ course }: CourseProps) => {
  return (
    <>
      <div className="w-full">
        <BackButton endpoint={Endpoint.ALL_COURSES} />
      </div>
      <CourseDescription
        course={course}
        action={
          course.is_enrolled ? CourseAction.ProgressBar : CourseAction.Enroll
        }
      />
      {course.modules && <ModuleList modules={course.modules} />}
    </>
  );
};
