// import type { Route } from "../app/+types/page";

import type { unstable_MiddlewareFunction } from "react-router";
import { redirect } from "react-router";
import { db } from "~/client/pocketbase";

// let bad_routes = ["home/fire"];
//
let unsafe_routes = ["/user/profile"];
export let middleware: unstable_MiddlewareFunction = async (
  { context, params, request },
  next,
) => {
  let response = (await next()) as Response;
  let url = new URL(request.url);
  console.log(url.pathname);
  let cookies = request.headers.get("cookie") ?? "";
  if (url.pathname == "/user/login") return response;
  let client = db();
  client.authStore.loadFromCookie(cookies);
  if (client.authStore.isValid) await client.collection("users").authRefresh();
  let new_cookie = client.authStore.exportToCookie();
  response.headers.set("set-cookie", new_cookie);
  return response;
  // return redirect("/",{

  // })
};
