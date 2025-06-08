import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { db } from "~/client/pocketbase";
import BlogCard from "~/components/BlogCard";
import BlogGrid from "~/components/BlogGrid";
import LoadingQuery from "~/components/LoadingQuery";
import Paginator from "~/components/Paginator";
import PostHeader from "~/components/PostHeader";
export async function loader({ request, params }: LoaderFunctionArgs) {
  let { search } = params;
  let url = new URL(request.url);
  let sort = url.searchParams.get("sort");
  let page = Number(url.searchParams.get("page"));
  let client = db();
  let response = await client.collection("posts").getList(page ?? 1, 20, {
    filter: search ? `title~"${search}"` : "",
    expand: "user_id",
    sort: sort ?? "",
  });

  return response;
}
export default function index() {
  let query = useLoaderData<typeof loader>();
  return (
    <div className="container mx-auto relative isolate">
      <div className="container mx-auto">
        <PostHeader title="Search" />
      </div>
      <div className="mt-4">
        <LoadingQuery {...(query as any)}>
          <BlogGrid>
            {query.items.map((item) => (
              <BlogCard {...(item as any)} key={item.id}></BlogCard>
            ))}
          </BlogGrid>
        </LoadingQuery>
      </div>
      <Paginator totalPages={query.totalPages} />
    </div>
  );
}
