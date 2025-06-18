let dummy_text =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum";

import { CalendarIcon } from "lucide-react";
import Markdown from "react-markdown";
import { useNavigate } from "react-router";
import type { POSTMODEL } from "types/types";
import { getUrl } from "~/client/pocketbase";
import { date_formatter } from "~/client/store";
export default function HeroCard(props: POSTMODEL) {
  let nav = useNavigate();
  return (
    <div
      className="w-full h-full isolate  flex relative cursor-pointer"
      onClick={() => {
        nav("/post/" + props.id, {
          viewTransition: true,
        });
      }}
    >
      <img
        src={getUrl(props, props.cover)}
        alt=""
        className="absolute rounded-xl inset-0 w-full object-cover from  h-full -z-10"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 rounded-xl  -z-10"></div>
      <div className="mt-auto container mx-auto  px-4 mb-4 ">
        <h2 className="text-white text-xl md:text-2xl font-bold leading-normal step pb-2 mb-2 capitalize">
          {props.title}
        </h2>
        <div className="propse line-clamp-2 text-white fade mb-4">
          <Markdown>{props.post}</Markdown>
        </div>
        <div className="flex items-center flex-wrap gap-2">
          <div
            className="flex items-center btn btn-glow h-auto py-2"
            onClick={(e) => {
              e.stopPropagation();
              nav("/post/user/" + props.user_id);
            }}
          >
            <div className="size-12 rounded-full grid-center text-xl text-primary-content capitalize  bg-primary ">
              {props.expand.user_id.username[0]}
            </div>
            <div className="ml-2 text-white text-sm font-bold capitalize">
              {props.expand.user_id.username}
            </div>
          </div>
          <div className="flex items-center md:ml-4">
            <div className="btn btn-neutral btn-circle btn-sm btn-ghost text-white border border-white">
              <CalendarIcon size={14} />
            </div>
            <div className="ml-2  text-white text-sm">
              {date_formatter(props.updated)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
