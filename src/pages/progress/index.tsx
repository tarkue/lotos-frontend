import { RoleType } from "@/src/shared/api/exports";

import ProgressStudentPage from "./student";
import ProgressTeacherPage from "./teacher";
import { redirect } from "next/navigation";
import { Endpoint } from "@/src/shared/models/endpoint-enum";
import { cookies } from "next/headers";

async function getRole() {
  const cookieStore = await cookies();
  return cookieStore.get("role")?.value as RoleType | undefined;
}

export default async function ProgressPage(props: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ p?: string }>;
}) {
  const role = await getRole();

  if (role == RoleType.STUDENT) return <ProgressStudentPage />;

  if (role == RoleType.TEACHER || role == RoleType.ADMIN)
    return <ProgressTeacherPage {...props} />;

  redirect(Endpoint.ALL_COURSES);
}
