import type { LoaderFunctionArgs } from "react-router";
import { db } from "~/client/pocketbase";

export async function action({ request }: LoaderFunctionArgs) {
  let cookies = request.headers.get("cookie") ?? "";
  let form = await request.formData();
  let client = db();
  client.authStore.loadFromCookie(cookies);
  if (!client.authStore.isValid)
    return Response.json(
      { message: "failed to upload" },
      {
        status: 400,
      },
    );

  let response = await client.collection("images").create(form);
  return Response.json({
    url: client.files.getURL(response, response.image),
  });
}
