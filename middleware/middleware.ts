// import type { Route } from "../app/+types/page";

import type { unstable_MiddlewareFunction } from "react-router";

import { db } from "~/client/pocketbase";
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
  if (client.authStore.isValid)
    await client
      .collection("users")
      .authRefresh()
      .catch((err) => {
        client.authStore.clear();
      });
  let clear_pb = cookie.serialize("pb_auth", "", {
    maxAge: -1,
  });
  let pb_auth = cookie.parse(orig__cookie);
  let new_cookie = !client.authStore.isValid
    ? clear_pb
    : pb_auth
    ? ""
    : client.authStore.exportToCookie();
  console.log(orig__cookie, "set-cookie");
  response.headers.append("set-cookie", new_cookie);
  return response;
};
