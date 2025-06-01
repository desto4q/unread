import useEmblaCarousel from "embla-carousel-react";
import HeroCard from "./HeroCard";

let arr = Array.from({ length: 10 }, (_, i) => i + 1);
export default function Hero() {
  const [emblaRef] = useEmblaCarousel({
    loop: true,
  });

  return (
    <div className="px-4 md:px-0">
      <div className="container mx-auto mt-8 mb-4 *:leading-loose">
        <h2 className="badge badge-soft badge-primary">New Posts</h2>
        <h1 className="text-3xl font-bold capitalize ">Browse Our Resources</h1>
        <p className="label text-sm font-semibold">
          We provide tips and resources from industry leaders. For real
        </p>
      </div>
      <div className="flex container mx-auto rounded-lg overflow-hidden">
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
