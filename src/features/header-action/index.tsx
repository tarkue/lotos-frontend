"use client";

import { useAuth } from "@/src/shared/api/context/auth-context";
import { Button } from "@/src/shared/ui/button";
import { LoginRedirect } from "./ui/login-redirect";
import { ProfileRedirect } from "./ui/profile-redirect";
import { HeaderLinks } from "./ui/links";

const HeaderProfileLink = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === undefined) {
    return <Button loading />;
  }

  if (isAuthenticated) {
    return <ProfileRedirect />;
  }

  return <LoginRedirect />;
};

export const HeaderAction = () => {
  return (
    <div className="flex gap-4">
      <HeaderLinks />
      <HeaderProfileLink />
    </div>
  );
};
