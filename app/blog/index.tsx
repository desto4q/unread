import { useQuery } from "@tanstack/react-query";
import type { ListResult, RecordModel } from "pocketbase";
import type { BlOGlIST, BLOGMODEL } from "types/types";
import { db } from "~/client/pocketbase";
import BlogCard from "~/components/BlogCard";
import BlogGrid from "~/components/BlogGrid";
import LoadingQuery from "~/components/LoadingQuery";
import Paginator from "~/components/Paginator";

export default function index() {
  let query = useQuery<ListResult<BLOGMODEL>>({
    queryKey: ["lastest_blog"],
    // @ts-ignore
    queryFn: async () => {
      let client = db();
      let response = await client.collection("posts").getList(1, 20, {
        fields:
          "title, cover, title, creatdeAt, collectionId, id, expand, user_id",
        expand: "user_id",
      });
      console.log(response.items[0]);
      return response;
    },
  });
  return (
    <div className="container mx-auto pb-12">
      <div className="h-18 flex items-center step sticky top-0">
        <h2 className="text-lg font-bold">Latest Posts</h2>
        <div className="ml-auto">
          <select className="select" defaultValue={"default"}>
            <option className="" value={"views"}>
              views:
            </option>
          </select>
        </div>
      </div>
      <div className=" mt-4">
        <LoadingQuery {...(query as any)}>
          <BlogGrid>
            {/* @ts-ignore             */}
            {query.data?.items.map((e, i) => (
              <BlogCard {...e} key={e.id} />
            ))}
          </BlogGrid>
        </LoadingQuery>
      </div>
      <Paginator />
    </div>
  );
}
