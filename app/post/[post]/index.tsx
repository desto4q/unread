import path from "path";
import fs from "fs";
import Markdown from "react-markdown";
import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import remarkGfm from "remark-gfm";
import { db, getUrl } from "~/client/pocketbase";

export async function loader({ params }: LoaderFunctionArgs) {
  const filePath = path.join(process.cwd(), "public", "md.txt");
  let client = db();
  let { post: id } = params;
  let response = await client.collection("posts").getOne(id as string);
  return response;
  // let text = fs.readFileSync(filePath, "utf8");
  // return text;
}
export default function index() {
  let text = useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto mt-8 pb-8">
      <div className="flex justify-center">
        <div className="w-full max-w-3xl">
          <div className="bg-base-300 h-[452px] w-full  mb-8">
            <img
              src={getUrl(text, text.cover)}
              alt=""
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <div className="prose  max-w-full">
            <Markdown remarkPlugins={[remarkGfm]}>{text.post}</Markdown>
          </div>
        </div>
      </div>
    </div>
  );
}
