let dummy_text =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum";
let dummy_image_url =
  "https://images.pexels.com/photos/32131630/pexels-photo-32131630/free-photo-of-scenic-road-through-canadian-rockies-in-jasper.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load";
import { CalendarIcon } from "lucide-react";
export default function HeroCard() {
  return (
    <div
      className="w-full h-full isolate flex relative"
      style={{
        backgroundImage: `url(${dummy_image_url})`,
        backgroundSize: "cover",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 -z-10"></div>
      <div className="mt-auto container mx-auto mb-4 px-4 ">
        <h2 className="text-white text-xl md:text-2xl font-bold leading-normal mb-4">
          Breaking Into Product Design:
          <br />
          Advice from Untitles Founder, Frenkie
        </h2>
        <p className="text-white text-justify truncate ">{dummy_text}</p>
        <div className="mt-8 flex items-center">
          <div className="flex items-center">
            <div className="size-8 bg-red-200 rounded-full"></div>
            <div className="ml-2 text-white">James Prateek Junior</div>
          </div>
          <div className="flex items-center ml-4">
            <div className="btn btn-neutral btn-circle btn-sm btn-ghost text-white border border-white">
              <CalendarIcon size={14} />
            </div>
            <div className="ml-2 text-white">June 05, 2005</div>
          </div>
        </div>
      </div>
    </div>
  );
}
