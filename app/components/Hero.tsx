import useEmblaCarousel from "embla-carousel-react";
import HeroCard from "./HeroCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

let arr = Array.from({ length: 10 }, (_, i) => i + 1);
export default function Hero() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
  });

  return (
    <div className="px-4 md:px-0">
      <div className="container mx-auto mt-8 mb-4 *:leading-loose">
        <h2 className="badge badge-soft badge-primary">New Posts</h2>
        <h1 className="text-3xl font-bold capitalize ">Browse Our Resources</h1>
        <p className="fade text-md font-semibold ">
          We provide tips and resources from industry leaders. For real
        </p>
      </div>
      <div className="flex container mx-auto rounded-lg overflow-hidden relative isolate ">
        <div className="absolute flex p-2 gap-2 right-0 m-2 z-10">
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
        <div className="embla bg-red-200 w-full" ref={emblaRef}>
          <div className="embla__container">
            {arr.map((callbackfn, i) => (
              <div className="embla__slide h-[522px]" key={"slide_" + i}>
                <HeroCard />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
