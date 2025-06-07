import path from "path";
import { useEffect } from "react";
import Markdown from "react-markdown";
import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import remarkGfm from "remark-gfm";
import { db, getUrl } from "~/client/pocketbase";
import { useClientHeight } from "~/client/store";

export async function loader({ params }: LoaderFunctionArgs) {
  let client = db();
  let { post: id } = params;
  let response = await client
    .collection("posts")
    .getOne(id as string)
    .catch((err) => {});
  return response;
  // let text = fs.readFileSync(filePath, "utf8");
  // return text;
}
export default function index() {
  let text = useLoaderData<typeof loader>();
  let { height } = useClientHeight();
  if (!text)
    return (
      <>
        {height > 0 && (
          <div
            className="container mx-auto py-8 pb-8  flex"
            style={{
              height: height,
            }}
          >
            <div className="flex-1 grid place-items-center gap-2">
              <div>
                <h2 className="text-xl font-bold capitalize fade">
                  post not found
                </h2>
                <button
                  className="btn btn-soft mt-2 btn-block"
                  onClick={(e) => {
                    console.log(window.location.reload());
                  }}
                >
                  Retry
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );

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
