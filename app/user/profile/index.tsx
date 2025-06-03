import { useQuery } from "@tanstack/react-query";
import type { LoaderFunctionArgs } from "react-router";
import { useLoaderData } from "react-router";
import { redirect } from "react-router";
import { db } from "~/client/pocketbase";
import BlogCard from "~/components/BlogCard";
import BlogGrid from "~/components/BlogGrid";
import LoadingQuery from "~/components/LoadingQuery";
export async function loader({ request }: LoaderFunctionArgs) {
  let cookies = request.headers.get("cookie") ?? "";
  let client = db();
  client.authStore.loadFromCookie(cookies);

  if (!client.authStore.isValid) return redirect("/");
  let user = client.authStore.record;
  if (!user) return redirect("/");
  return user;
}

export default function index() {
  let resp = useLoaderData<typeof loader>();

  let query = useQuery({
    queryKey: ["user_data", "posts"],
    queryFn: async () => {
      let client = db();
      let response = client.collection("posts").getList(1, 20, {
        filter: `user_id="${resp.id}"`,
        expand: "user_id",
      });
      return response;
    },
  });
  return (
    <div className="">
      <div className="h-[240px] w-full  flex bg-base-300 relative isolate">
        <div className="absolute inset-0 bg-gradient-to-t from-neutral/25 -z-10"></div>
        <div className="container mx-auto mt-auto">
          <div className="flex items-center">
            <div className="size-18 bg-primary rounded-md "> </div>
            <div className="ml-2">
              <h2 className="text-lg font-bold  fade">{resp.username}</h2>
              <p className="label">{resp.email}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-4 h-16 step flex items-center">
        <h2 className="fade text-xl font-bold">Blog Posts:</h2>
      </div>
      <div className="mt-4 container mx-auto">
        <LoadingQuery {...(query as any)}>
          <BlogGrid>
            {query?.data?.items.map((item) => {
              return <BlogCard {...(item as any)} key={item.id}></BlogCard>;
            })}
          </BlogGrid>
        </LoadingQuery>
      </div>
    </div>
  );
}
