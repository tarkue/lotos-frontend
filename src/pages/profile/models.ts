import { Endpoint } from "@/src/shared/models/endpoint-enum";

export const ProfileTabs = ["Редактировать данные", "Смена пароля"] as const;
export const ProfileEndpointMap = {
  [ProfileTabs[0]]: Endpoint.PROFILE,
  [ProfileTabs[1]]: Endpoint.RESET_PASSWORD,
} as const;
