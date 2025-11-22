import { Endpoint } from "@/src/shared/models/endpoint-enum";
import { redirect } from "next/navigation";

export default function RedirectFn() {
  redirect(Endpoint.ALL_COURSES);
}
