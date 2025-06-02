import type { ActionFunctionArgs } from "react-router";
import { db } from "~/client/pocketbase";

export async function action({ request }: ActionFunctionArgs) {
  let cookies = request.headers.get("cookie") ?? "";
  let client = db();
  client.authStore.loadFromCookie(cookies);
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
  let post = form.get("post");
  let cover = form.get("cover") as Blob;
  let title = form.get("title");
  if (!post)
    return Response.json(
      { message: "no form" },
      {
        status: 500,
      }
    );

    console.log(cover)
  let response = await client.collection("posts").create({
    post: post,
    cover: cover,
    title: title,
    user_id: client.authStore.record?.id,
  });
  return response;
}
