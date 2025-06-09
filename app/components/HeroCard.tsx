let dummy_text =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum";
let dummy_image_url =
  "https://images.pexels.com/photos/32131630/pexels-photo-32131630/free-photo-of-scenic-road-through-canadian-rockies-in-jasper.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load";
import { CalendarIcon } from "lucide-react";
import { useNavigate } from "react-router";
import type { POSTMODEL } from "types/types";
import { getUrl } from "~/client/pocketbase";
import { date_formatter } from "~/client/store";
export default function HeroCard(props: POSTMODEL) {
  let nav = useNavigate();
  return (
    <div
      className="w-full h-full isolate flex relative"
      onClick={() => {
        nav("/post/" + props.id, {
          viewTransition: true,
        });
      }}
    >
      <img
        src={getUrl(props, props.cover) || dummy_image_url}
        alt=""
        className="absolute inset-0 w-full object-cover from  h-full -z-10"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-900  -z-10"></div>
      <div className="mt-auto container mx-auto  px-4 mb-4 ">
        <h2 className="text-white text-xl md:text-2xl font-bold leading-normal step ">
          {props.title}
        </h2>
        <p className="text-white fade text-sm my-2 text-justify truncate ">
          {dummy_text}
        </p>
        <div className="flex items-center flex-wrap gap-2">
          <div className="flex items-center">
            <div className="size-6 bg-primary rounded-full"></div>
            <div className="ml-2 text-white">
              {props.expand.user_id.username}
            </div>
          </div>
          <div className="flex items-center md:ml-4">
            <div className="btn btn-neutral btn-circle btn-sm btn-ghost text-white border border-white">
              <CalendarIcon size={14} />
            </div>
            <div className="ml-2  text-white">
              {date_formatter(props.updated)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
