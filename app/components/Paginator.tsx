import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ListResult, RecordModel } from "pocketbase";
import { useEffect } from "react";
import { useLoaderData, useSearchParams } from "react-router";
import { toast } from "sonner";

export default function Paginator({
  totalPages,
  page: currpage,
}: {
  totalPages: number;
  page?: number;
}) {
  let [searchParams, setSearchParam] = useSearchParams();
  let currPage = searchParams.get("page");
  let page = Number(currPage);

  let updatePage = () => {
    return {
      increase: () => {
        page = currpage || page;
        if (page >= totalPages || page == totalPages)
          return toast("Reached page end", {
            duration: 800,
          });

        const currentPage = isNaN(page) || page < 1 ? 1 : page;
        const newPage = currentPage + 1;
        searchParams.set("page", String(newPage));
        setSearchParam(searchParams);
      },
      decrease: () => {
        const newPage = page > 1 ? page - 1 : 1;
        searchParams.set("page", String(newPage));
        setSearchParam(searchParams);
      },
    };
  };
  return (
    <div className="fixed bottom-0 left-0 flex h-16 items-center justify-center right-0 bg-base-300">
      <div className="flex gap-2 ">
        <button className="btn" onClick={updatePage().decrease}>
          <ChevronLeft />
        </button>
        <div className="btn">{currPage ?? 1}</div>
        <button className="btn" onClick={updatePage().increase}>
          <ChevronRight />
        </button>
        <div className="btn-accent btn btn-soft">Max Page: {totalPages}</div>
      </div>
    </div>
  );
}
