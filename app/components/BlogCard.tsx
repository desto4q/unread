import { Link } from "react-router";
import type { BLOGMODEL } from "types/types";
import { getUrl } from "~/client/pocketbase";

export default function BlogCard(props: BLOGMODEL) {
  let default_link =
    "https://images.pexels.com/photos/15202105/pexels-photo-15202105/free-photo-of-a-person-with-legs-raised-in-a-field.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load";
  let img_link = getUrl(props, props.cover);
  return (
    <Link to={`/post/${props.id}`} className="">
      <img
        src={img_link}
        className="w-full object-cover h-[200px]  rounded-xl"
        alt=""
      />
      <div className="mx-2">
        <h2 className="font-bold step mb-2  mt-1 line-clamp-1">{props.title}</h2>
        <div className="flex items-center">
          <div
            className={
              "size-6 rounded-full bg-base-300 outline outline-primary shrink-0"
            }
          ></div>
          <p className="ml-2 text-sm font-bold fade truncate">
            {props.expand.user_id.username}
          </p>
        </div>
      </div>
      {/* <div className="gap-2 flex flex-col mt-2">
        <h2 className="font-bold truncate text-lg">{props.title}</h2>
        <div className="flex items-center">
          <div className={"size-6 rounded-full bg-red-200"}></div>
          <p className="ml-2 text-sm font-bold fade">
            {props.expand.user_id.username}
          </p>
        </div>
      </div> */}
    </Link>
  );
}
