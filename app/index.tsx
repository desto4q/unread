import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import Hero from "./components/Hero";
import BlogGrid from "./components/BlogGrid";
import SearchBar from "./components/SearchBar";
import { db } from "./client/pocketbase";
import BlogCard from "./components/BlogCard";
import type { BLOGMODEL } from "types/types";

let arr = Array.from({ length: 10 }, (_, i) => i + 1);
export async function loader({ request, params }: LoaderFunctionArgs) {
  let client = db();
  let resp = await client.collection("posts").getList(1, 20, {
    sort: "view_id.views",
    expand: "user_id",
  });
  return resp;
}
export default function index() {
  let resp = useLoaderData();
  return (
    <div>
      <Hero />
      <div className="container mx-auto mt-4 px-4 md:px-0">
        <div className="flex items-center py-2 step mb-4">
          <h2 className=" text-xl font-bold py-2">Popular Posts </h2>
          <div className="ml-auto md:block hidden">
            <SearchBar />
          </div>
        </div>
        <BlogGrid>
          {resp.items.map((item: BLOGMODEL, i: number) => (
            <BlogCard key={i} {...item} />
          ))}
        </BlogGrid>
      </div>
    </div>
  );
}
