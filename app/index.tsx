import { useLoaderData } from "react-router";
import Hero from "./components/Hero";
import BlogGrid from "./components/BlogGrid";
import SearchBar from "./components/SearchBar";
import Card from "./components/Card";

let arr = Array.from({ length: 10 }, (_, i) => i + 1);

export default function index() {
  let resp = useLoaderData();
  return (
    <div>
      <Hero />
      <div className="container mx-auto mt-4">
        <div className="flex items-center py-2 step mb-4">
          <h2 className=" text-xl font-bold py-2">Latest Posts </h2>
          <div className="ml-auto">
            <SearchBar />
          </div>
        </div>
        <BlogGrid>
          {arr.map((callbackfn, i) => (
            <Card key={i}/>
          ))}
        </BlogGrid>
      </div>
    </div>
  );
}
