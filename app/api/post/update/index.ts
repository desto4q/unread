import { ClientResponseError } from "pocketbase";
import type { ActionFunctionArgs } from "react-router";
import { db } from "~/client/pocketbase";

export async function action({ request, params }: ActionFunctionArgs) {
  let cookie = request.headers.get("cookie") || "";

  let client = db();
  client.authStore.loadFromCookie(cookie);
  if (!client.authStore.isValid)
    return Response.json(
      {
        message: "authorization required",
      },
      {
        status: 401,
      }
    );
  let form = await request.formData();
  let cover = form.get("cover");
  let post = form.get("post") as string;
  let id = form.get("id") as string;
  let title = form.get("title") as string;

  try {
    let resp = await client.collection("posts").update(id, {
      cover: cover ?? null,
      post: post,
      id: id,
      title: title,
    });
    return Response.json("success");
  } catch (err) {
    if (err instanceof ClientResponseError) {
      console.log(err.data);
      return Response.json(err, {
        status: 500,
      });
    }
  }
}
