import { redirect } from "next/navigation";
import { Endpoint } from "../src/shared/models/endpoint-enum";

export default function RedirectFn() {
  redirect(Endpoint.ALL_COURSES);
}
