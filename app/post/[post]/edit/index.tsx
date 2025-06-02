import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { db } from "~/client/pocketbase";
import PostEditor from "~/components/PostEditor";
export async function loader({ params }: LoaderFunctionArgs) {
  let { post } = params;
  if (!post) return null;
  let client = db();
  let post_result = await client.collection("posts").getOne(post);
  return post_result;
}
export default function index() {
  let resp = useLoaderData<typeof loader>();
  return (
    <div className="">{resp && <PostEditor md={resp.post} id={resp.id} />}</div>
  );
}
