import { useQuery } from "@tanstack/react-query";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useParams } from "react-router";
import { db } from "~/client/pocketbase";
import BlogCard from "~/components/BlogCard";
import BlogGrid from "~/components/BlogGrid";
import Card from "~/components/Card";
import LoadingQuery from "~/components/LoadingQuery";
let arr = Array.from({ length: 10 }, (_, i) => i + 1);

export default function index() {
  let { search } = useParams();

  let query = useQuery({
    queryKey: ["search"],
    queryFn: async () => {
      let client = db();
      let response = await client.collection("posts").getList(1, 20, {
        filter: search ? `title~"${search}"` : "",
        expand: "user_id",
      });

      return response;
    },
  });
  return (
    <div className="container mx-auto relative isolate">
      <div className="mt-4 py-2 step">
        <div className="text-xl font-bold">
          <span className="fade-md">Search:</span> {search}
        </div>
      </div>
      <div className="mt-4">
        <LoadingQuery {...(query as any)}>
          <BlogGrid>
            {query.data?.items.map((item) => (
              <BlogCard {...(item as any)} key={item.id}></BlogCard>
            ))}
          </BlogGrid>
        </LoadingQuery>
      </div>
      <div className="fixed left-0 w-full bg-white py-2 bottom-0 z-10 flex">
        <div className="join gap-2 mx-auto">
          <button className="btn btn-square btn-primary btn-soft join-item">
            <ChevronLeftIcon />
          </button>
          <div className="join-item btn btn-square">2</div>
          <button className="btn btn-square btn-primary btn-soft join-item">
            <ChevronRightIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
