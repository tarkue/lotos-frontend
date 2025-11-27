import { BackButton } from "@/src/features/back";
import { api } from "@/src/shared/api";
import { sfwr } from "@/src/shared/libs/server-fetch-with-refresh";
import { Endpoint } from "@/src/shared/models/endpoint-enum";
import { Container } from "@/src/shared/ui/container";
import { Typography } from "@/src/shared/ui/typography";
import { UserUpdateForm } from "@/src/widgets/user-update-form";

export async function fetchProfile() {
  return await sfwr(api.users.getMyProfile);
}

export default async function ProfilePage() {
  const user = await fetchProfile();
  return (
    <Container className="flex flex-col gap-4 items-center pb-[117px] min-h-[calc(100dvh-167px)] w-full">
      <div className="w-full">
        <BackButton endpoint={Endpoint.MY_COURSES} />
      </div>
      <div className="flex flex-col gap-3 w-full min-h-full">
        <Typography.H1>Ваш профиль</Typography.H1>
        <UserUpdateForm defaultValues={user} />
      </div>
    </Container>
  );
}
