import type { AuthRecord, RecordModel } from "pocketbase";
import type { LoaderFunctionArgs } from "react-router";
import { Link } from "react-router";
import { useLoaderData } from "react-router";
import { redirect } from "react-router";
import { db } from "~/client/pocketbase";
import BlogCard from "~/components/BlogCard";
import BlogGrid from "~/components/BlogGrid";
import Paginator from "~/components/Paginator";
import PostHeader from "~/components/PostHeader";
export async function loader({ request }: LoaderFunctionArgs) {
  let url = new URL(request.url);
  let sort = url.searchParams.get("sort");
  let page = Number(url.searchParams.get("page"));
  let cookies = request.headers.get("cookie") ?? "";
  let client = db();
  client.authStore.loadFromCookie(cookies);
  if (!client.authStore.isValid) return redirect("/");
  let user: AuthRecord | undefined = client.authStore.record;

  if (!user) return redirect("/");
  let user_posts = await client.collection("posts").getList(page ?? 1, 20, {
    filter: `user_id="${user.id}"`,
    expand: "user_id",
    sort: sort ?? "",
  });
  return { user, user_posts };
}

export default function index() {
  let resp = useLoaderData<typeof loader>();

  return (
    <div className="">
      <div className="relative">
        <div className="h-[200px] bg-gradient-to-r from-primary/50 to-secondary/50"></div>
        <div className="h-[40px] relative container mx-auto mb-2">
          <div className="size-25  bottom-0 absolute rounded-full bg-primary border-5 shadow  border-base-100 grid place-items-center text-4xl font-bold capitalize text-primary-content">
            {resp.user.username[0]}
          </div>
        </div>
        <div className="container mx-auto mt-2 px-2 md:px-0">
          <h2 className="font-bold capitalize text-xl">{resp.user.username}</h2>
          <p className="font-semibold fade-md text-sm">{resp.user.email}</p>
          <div className="mt-2 flex items-center gap-2">
            <button className="btn btn-primary">Edit Profile</button>
            <button className="btn">Settings</button>
            <Link to={"/api/auth/logout"} className="btn btn-error ml-auto">
              Logout
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto">
        <PostHeader title="User Posts" />
      </div>
      <div className="mt-4 container mx-auto mb-12">
        <BlogGrid>
          {resp.user_posts.items.map((item) => {
            return <BlogCard {...(item as any)} key={item.id}></BlogCard>;
          })}
        </BlogGrid>
      </div>
      <Paginator
        page={resp.user_posts.page}
        totalPages={resp.user_posts.totalPages}
      />
    </div>
  );
}
