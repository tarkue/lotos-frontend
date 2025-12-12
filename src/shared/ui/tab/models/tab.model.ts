import { Endpoint } from "@/src/shared/models/endpoint-enum";

export interface TabModel {
  title: string;
  href: `${Endpoint}`;
}
