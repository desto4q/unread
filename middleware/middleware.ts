// import type { Route } from "../app/+types/page";

import type { unstable_MiddlewareFunction } from "react-router";

import { redirect } from "react-router";
import { db } from "~/client/pocketbase";

// let bad_routes = ["home/fire"];
import * as cookie from "cookie";
let unsafe_routes = ["/user/profile"];
export let middleware: unstable_MiddlewareFunction = async (
  { context, params, request },
  next
) => {
  let response = (await next()) as Response;
  let orig__cookie = response.headers.get("set-cookie") ?? "";
  let url = new URL(request.url);
  let cookies = request.headers.get("cookie") ?? "";
  if (url.pathname == "/user/login") return response;
  let client = db();
  client.authStore.loadFromCookie(cookies);
  if (client.authStore.isValid) await client.collection("users").authRefresh();
  let pb_auth = cookie.parse(orig__cookie);
  let new_cookie = pb_auth ? "" : client.authStore.exportToCookie();
  console.log(orig__cookie, "set-cookie");
  response.headers.append("set-cookie", new_cookie);
  return response;
};

// export let middleware: unstable_MiddlewareFunction = async (
//   { context, params },
//   next
// ) => {
//   return await next();
// };
