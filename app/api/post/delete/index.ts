import type { LoaderFunctionArgs } from "react-router";
import { db } from "~/client/pocketbase";

export async function action({ params, request }: LoaderFunctionArgs) {
  let cookie = request.headers.get("cookie") || "";
  let client = db();
  client.authStore.loadFromCookie(cookie);
  let user = client.authStore.record;
  if (!user)
    return Response.json("unauthorized", {
      status: 401,
    });
  let form = await request.formData();
  let id = form.get("id") as string;
  try {
    await client
      .collection("posts")
      .delete(id)
    return Response.json("deleted");
  } catch (error) {
    return Response.json("error deleting post", {
      status: 500
    });
  }
}
