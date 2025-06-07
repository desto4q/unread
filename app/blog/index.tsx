import { useEffect } from "react";
import {
  useLoaderData,
  useSearchParams,
  type LoaderFunctionArgs,
} from "react-router";
import type { BLOGLIST, BLOGMODEL } from "types/types";
import { db } from "~/client/pocketbase";
import BlogCard from "~/components/BlogCard";
import BlogGrid from "~/components/BlogGrid";
import Paginator from "~/components/Paginator";

export async function loader({ request }: LoaderFunctionArgs) {
  let url = new URL(request.url);
  let sort = url.searchParams.get("sort");
  let page = Number(url.searchParams.get("page"));
  let client = db();
  let response = (await client
    .collection("posts")
    .getList(page ?? 1, 20, {
      fields:
        "title, cover, title, createdAt, collectionId, id, expand, user_id",
      expand: "user_id",
      sort: sort ?? "",
    })
    .catch((err) => {})) as BLOGLIST;

  return response;
}
export default function index() {
  let query = useLoaderData<typeof loader>();
  let [searchParams, setSeachParams] = useSearchParams();
  useEffect(() => {
    console.log(query);
  }, []);
  return (
    <div className="container mx-auto pb-12 ">
      <div className="h-18 flex items-center step sticky top-0">
        <h2 className="text-lg font-bold">Latest Posts</h2>
        <div className="ml-auto">
          <select
            className="select"
            defaultValue={"default"}
            onChange={(e) => {
              console.log(e.target.value);

              searchParams.set("sort", e.target.value);
              if (e.target.value == "") searchParams.delete("sort");
              setSeachParams(searchParams);
            }}
          >
            <option value={""}>Default</option>
            <option className="" value={"-created"}>
              oldest
            </option>
            <option className="" value={"view_id.views"}>
              Views: Highest
            </option>
            <option className="" value={"-view_id.views"}>
              Views: Lowest
            </option>
          </select>
        </div>
      </div>
      <div className=" mt-4">
        {query && (
          <BlogGrid>
            {query.items.map((e, i) => (
              <BlogCard {...e} key={e.id} />
            ))}
          </BlogGrid>
        )}
      </div>
      <Paginator />
    </div>
  );
}
