import { redirect, type LoaderFunctionArgs } from "react-router";
import * as cookie from "cookie";
export async function loader({ request, params }: LoaderFunctionArgs) {
  let new_cookie = cookie.serialize("pb_auth", "ballz", {
    path: "/",
    maxAge: -1,
  });
  let header = new Headers();
  header.append("Set-Cookie", new_cookie);
  return redirect("/", {
    headers: header,
  });
}
