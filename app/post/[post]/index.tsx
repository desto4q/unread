import { ChevronLeftIcon } from "lucide-react";
import Markdown from "react-markdown";
import { Link, useLoaderData, type LoaderFunctionArgs } from "react-router";
import remarkGfm from "remark-gfm";
import { checkCookie, db, getUrl } from "~/client/pocketbase";
import { useClientHeight } from "~/client/store";

export async function loader({ params, request }: LoaderFunctionArgs) {
  let cookie = request.headers.get("cookie") || "";
  let client = db();
  let { post: id } = params;
  let response = await client
    .collection("posts")
    .getOne(id as string, {
      expand: "view_id,user_id",
    })
    .catch((err) => {});
  let view = await client
    .collection("views")
    .update(response?.view_id as string, {
      // @ts-ignore
      views: response.expand.view_id.views + 1,
    });
  let user = checkCookie(cookie, client);
  return { response, user };
}
export default function index() {
  let query = useLoaderData<typeof loader>();
  let { height } = useClientHeight();
  if (!query.response)
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
      <div className="flex items-center mb-4">
        <Link to={-1} className="btn">
          <ChevronLeftIcon size={16} /> Go Back
        </Link>
        {/* @ts-ignore */}
        {query?.user.id == query.response.user_id && (
          <Link
            to={`/post/${query.response.id}/edit`}
            className="btn btn-soft btn-primary ml-auto"
          >
            Edit
          </Link>
        )}
      </div>
      <div className="flex justify-center">
        <div className="w-full max-w-3xl">
          <div className="bg-base-300 h-[452px] w-full  mb-8">
            <img
              src={getUrl(query.response, query.response.cover)}
              alt=""
              className="w-full h-full object-cover rounded-md"
            />
          </div>

          <div className="container mx-auto mb-4 gap-2 flex items-center gap-1">
            <span className="text-xl font-bold">Author:</span>
            <Link to={"/"} className="btn btn-ghost h-auto py-2">
              <div className="size-10 rounded-full bg-base-300"></div>
              <h2 className="font-bold fade">
                {/* @ts-ignore */}

                {query.response?.expand.user_id.username}
              </h2>
            </Link>
          </div>
          <div className="prose  max-w-full">
            <Markdown remarkPlugins={[remarkGfm]}>
              {query.response.post}
            </Markdown>
          </div>
        </div>
      </div>
    </div>
  );
}
