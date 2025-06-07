import { Outlet, redirect, type LoaderFunctionArgs } from "react-router";
import { db } from "~/client/pocketbase";
let protected_routes = ["/post/create", "/post/edit", "/post/update"];
export async function loader({ request }: LoaderFunctionArgs) {
  let pathName = new URL(request.url).pathname;
  let cookies = request.headers.get("cookie") || "";
  let client = db();
  client.authStore.loadFromCookie(cookies);
  let allowed = protected_routes.some((predicate) => pathName == predicate);
  if (!client.authStore.isValid && allowed) redirect("/blog");
  return "";
}
export default function layout() {
  return (
    <>
      <Outlet />
    </>
  );
}
