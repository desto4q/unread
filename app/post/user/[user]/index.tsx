import {
  useLoaderData,
  useParams,
  type LoaderFunctionArgs,
} from "react-router";
import { db } from "~/client/pocketbase";
import BlogCard from "~/components/BlogCard";
import BlogGrid from "~/components/BlogGrid";
import Paginator from "~/components/Paginator";
import PostHeader from "~/components/PostHeader";

export async function loader({ request, params }: LoaderFunctionArgs) {
  //@ts-ignore
  const { user }: { user: string; [key: string]: any } = params;
  let client = db();
  let url = new URL(request.url);
  let sort = url.searchParams.get("sort");
  let page = Number(url.searchParams.get("page"));
  let user_ = await client.collection("users").getOne(user as string);
  let posts = await client.collection("posts").getList(page || 1, 20, {
    filter: `user_id="${user as string}"`,
    expand: "user_id",
    sort: sort || "",
  });
  return { user_, posts };
}
export default function index() {
  let props = useLoaderData<typeof loader>();
  return (
    <div className="container mx-auto">
      <div className="mt-4 flex items-center">
        <div className="shadow-lg bg-primary/10 text-primary uppercase text-xl font-bold  size-22 rounded-full grid-center flex-none">
          {props.user_.username[0]}
        </div>
        <div className="ml-4">
          <div className="font-bold capitalize">{props.user_.username}</div>
          <div className="font-bold fade-md">u/{props.user_.id}</div>
        </div>
      </div>
      <div>
        <PostHeader title={`Posts by ${props.user_.username}`} />
      </div>
      <div className="my-4">
        <BlogGrid>
          {props.posts.items.map((item) => {
            return <BlogCard {...(item as any)} key={item.id} />;
          })}
        </BlogGrid>
      </div>
      <Paginator page={props.posts.page} totalPages={props.posts.totalPages} />
    </div>
  );
}
