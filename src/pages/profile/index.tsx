import { BackButton } from "@/src/features/back";
import { UserAction } from "@/src/features/user-action/";
import { api } from "@/src/shared/api";
import { sfwr } from "@/src/shared/libs/server-fetch-with-refresh";
import { Endpoint } from "@/src/shared/models/endpoint-enum";
import { Container } from "@/src/shared/ui/container";
import { Typography } from "@/src/shared/ui/typography";
import { UserUpdateForm } from "@/src/widgets/user-update-form";
import { redirect } from "next/navigation";

export async function fetchProfile() {
  try {
    return await sfwr(api.users.getMyProfile);
  } catch {
    redirect(Endpoint.LOGIN);
  }
}

export default async function ProfilePage() {
  const user = await fetchProfile();
  return (
    <Container className="flex flex-col gap-4 items-center pb-[117px] min-h-[calc(100dvh-var(--footer-height-and-padding))] w-full">
      <div className="w-full">
        <BackButton endpoint={Endpoint.ALL_COURSES} />
      </div>
      <div className="flex flex-col gap-3 w-full min-h-full">
        <Typography.H1>Ваш профиль</Typography.H1>
        <UserUpdateForm defaultValues={user} buttons={<UserAction.Logout />} />
      </div>
    </Container>
  );
}
