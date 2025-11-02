import { redirect } from "next/navigation";

export default function RedirectFn() {
  redirect("/catalog/all");
}
