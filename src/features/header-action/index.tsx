"use client";

import { useAuth } from "@/src/shared/api/context/auth-context";
import { SpinnerButton } from "@/src/shared/ui/button";
import { LoginRedirect } from "./ui/login-redirect";
import { ProfileRedirect } from "./ui/profile-redirect";

export const HeaderAction = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === undefined) {
    return <SpinnerButton />;
  }

  if (isAuthenticated) {
    return <ProfileRedirect />;
  }

  return <LoginRedirect />;
};
