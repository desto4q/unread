import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import type { BLOGLIST, BLOGMODEL } from "types/types";
import { db } from "~/client/pocketbase";
import BlogCard from "~/components/BlogCard";
import BlogGrid from "~/components/BlogGrid";
import Paginator from "~/components/Paginator";
import PostHeader from "~/components/PostHeader";

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

  return (
    <div className="container mx-auto pb-12 ">
      <PostHeader title="latest Post" />
      <div className=" mt-4">
        {query && (
          <BlogGrid>
            {query.items.map((e, i) => (
              <BlogCard {...e} key={e.id} />
            ))}
          </BlogGrid>
        )}
      </div>
      <Paginator totalPages={query.totalPages} />
    </div>
  );
}
