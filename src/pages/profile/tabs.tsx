"use client";

import { Tab } from "@/src/shared/ui/tab";
import { ProfileEndpointMap, ProfileTabs } from "./models";
import { useRouter } from "next/navigation";

export const ProfileTab = ({ defaultValues }: { defaultValues: number }) => {
  const router = useRouter();
  return (
    <Tab.Map
      defaultValue={ProfileTabs[defaultValues]}
      elements={ProfileTabs}
      onChange={(e) => router.push(ProfileEndpointMap[e])}
      className="h-full"
    />
  );
};
