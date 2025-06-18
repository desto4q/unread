import useEmblaCarousel from "embla-carousel-react";
import HeroCard from "./HeroCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { db } from "~/client/pocketbase";
import type { ListResult } from "pocketbase";
import LoadingQuery from "./LoadingQuery";
import type { BLOGLIST, BLOGMODEL, POSTMODEL } from "types/types";

let arr = Array.from({ length: 10 }, (_, i) => i + 1);
export default function Hero() {
  let query = useQuery<BLOGLIST>({
    queryKey: ["new"],
    queryFn: async () => {
      let client = db();
      let resp = await client.collection("posts").getList(1, 10, {
        sort: "view_id.views",
        expand: "user_id",
      });
      return resp as BLOGLIST;
    },
  });

  if (query.isError) return <>error</>;
  return (
    <div className="px-4 md:px-0 ">
      <div className="container mx-auto mt-8 mb-2 *:leading-loose">
        <h2 className="badge badge-soft badge-primary">New Posts</h2>
        <h1 className="text-3xl font-bold capitalize ">Browse Our Resources</h1>
        <p className="fade text-lg font-semibold   mb-4">
          We provide tips and resources from industry leaders. For real
        </p>
        <LoadingQuery {...(query as any)}>
          <Carousel data={query.data as any}  />
        </LoadingQuery>
      </div>
    </div>
  );
}

let Carousel = ({ data }: { data: ListResult<POSTMODEL> }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
  });

  return (
    <div className="flex drop-shadow-2xl container mx-auto rounded-lg p-2 min-h-[520px] overflow-hidden relative isolate ">
      <div className="absolute flex p-2 gap-2 right-0 m-2 z-10 *:shadow">
        <button
          className="btn btn-circle"
          onClick={() => {
            emblaApi?.scrollPrev();
          }}
        >
          <ChevronLeft />
        </button>
        <button
          className="btn btn-circle"
          onClick={() => {
            emblaApi?.scrollNext();
          }}
        >
          <ChevronRight />
        </button>
      </div>
      <div className="embla bg-base-200 w-full" ref={emblaRef}>
        <div className="embla__container">
          {data.items.length > 0 ? (
            data.items &&
            data.items.map((item, i) => (
              <div className="embla__slide h-[522px]" key={"slide_" + i}>
                <HeroCard {...item} />
              </div>
            ))
          ) : (
            <div className="grid-center bg-base-300 ">
              <h2 className="text-xl capitalize font-bold fade-md">No Blog Posts</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
