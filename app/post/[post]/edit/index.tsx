import { useLoaderData, useParams } from "react-router";
import Editor from "~/components/Editor";
import PostEditor from "~/components/PostEditor";
export async function loader() {
  return "";
}
export default function index() {
  let resp = useLoaderData<typeof loader>();
  let { post } = useParams();

  return (
    <div className="">
      {/* <Editor oldMd="sos" id={post} /> */}
      <PostEditor md="sossssss" id={post} />
    </div>
  );
}
