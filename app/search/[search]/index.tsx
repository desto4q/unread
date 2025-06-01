import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useParams } from "react-router";
import BlogGrid from "~/components/BlogGrid";
import Card from "~/components/Card";
let arr = Array.from({ length: 10 }, (_, i) => i + 1);

export default function index() {
  let { search } = useParams();
  return (
    <div className="container mx-auto relative isolate">
      <div className="mt-4 py-2 step">
        <div className="text-xl font-bold">
          <span className="fade-md">Search:</span> {search}
        </div>
      </div>
      <div className="mt-4">
        <BlogGrid>
          {arr.map((item) => (
            <Card key={item} />
          ))}
        </BlogGrid>
      </div>
      <div className="sticky w-full bg-white py-2 bottom-0 z-10 flex">
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
