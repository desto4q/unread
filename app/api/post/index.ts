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
      },
    );
  let form = await request.formData();
  let post = form.get("post");
  let cover = form.get("cover");
  if (!post)
    return Response.json(
      { message: "no form" },
      {
        status: 500,
      },
    );

  let response = await client.collection("posts").create({
    post: post,
    cover: cover,
    user_id: client.authStore.record?.id,
  });
  return response;
}
