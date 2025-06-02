import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from "react-router";

export default function Paginator() {
  let [searchParams] = useSearchParams();
  let page = searchParams.get("page");
  return (
    <div className="fixed bottom-0 left-0 flex h-16 items-center justify-center right-0 bg-base-300">
      <div className="flex gap-2">
        <button className="btn">
          <ChevronLeft />
        </button>
        <div className="btn">{page ?? 1}</div>
        <button className="btn">
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}
