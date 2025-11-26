import { api } from "@/src/shared/api";
import { TokenPair } from "@/src/shared/api/models/token.model";
import { GetTokenPairFromCookie } from "@/src/shared/libs/cookie";
import { Endpoint } from "@/src/shared/models/endpoint-enum";
import { Typography } from "@/src/shared/ui/typography";
import { CourseCatalog } from "@/src/widgets/course-catalog";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const DEFAULT_VALUE = { courses: [] };

export async function FetchMyCourses(tokenPair?: TokenPair) {
  if (tokenPair === undefined) {
    redirect(Endpoint.ALL_COURSES);
  }

  api.student.setTokens(tokenPair);

  try {
    return await api.student.getMyCourses();
  } catch {
    return DEFAULT_VALUE;
  }
}

export default async function MyCoursePage() {
  const cookieStore = await cookies();
  const { courses } = await FetchMyCourses(GetTokenPairFromCookie(cookieStore));

  if (courses.length === 0) {
    return (
      <Typography.Body className="text-gray text-center">
        Здесь пока ничего нет
      </Typography.Body>
    );
  }
  return <CourseCatalog.List courses={courses} />;
}
