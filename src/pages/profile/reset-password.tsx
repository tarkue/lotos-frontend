import { getFullName } from "@/src/entity/user";
import { UserAction } from "@/src/features/user-action/";
import { api } from "@/src/shared/api";
import { sfwr } from "@/src/shared/libs/server-fetch-with-refresh";
import { Endpoint } from "@/src/shared/models/endpoint-enum";
import { Container } from "@/src/shared/ui/container";
import { SidebarPortal } from "@/src/shared/ui/sidebar";
import { Typography } from "@/src/shared/ui/typography";
import { redirect } from "next/navigation";
import { ProfileTab } from "./tabs";
import { UpdatePasswordForm } from "@/src/features/update-password-form";

export async function fetchProfile() {
  try {
    return await sfwr(api.users.getMyProfile);
  } catch {
    redirect(Endpoint.LOGIN);
  }
}

export default async function ResetPasswordPage() {
  const user = await fetchProfile();
  return (
    <>
      <SidebarPortal>
        <div className="flex flex-col gap-1 px-3">
          <Typography.Caption className="text-light-gray">
            ЛИЧНЫЙ КАБИНЕТ
          </Typography.Caption>
          <Typography.Subtitle className="text-black">
            {getFullName(user)}
          </Typography.Subtitle>
        </div>
        <ProfileTab defaultValues={1} />
        <UserAction.Logout />
      </SidebarPortal>
      <Container
        component="main"
        className="flex flex-col gap-4 items-center min-h-[calc(100dvh-var(--footer-height-and-padding))] w-full"
      >
        <div className="flex flex-col gap-9 w-full mt-9">
          <Typography.Title className="text-black">
            Смена пароля
          </Typography.Title>
          <section className="w-full p-6 rounded-2xl bg-white">
            <UpdatePasswordForm />
          </section>
        </div>
      </Container>
    </>
  );
}
