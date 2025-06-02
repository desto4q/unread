import type { BLOGMODEL } from "types/types";
import { getUrl } from "~/client/pocketbase";

export default function BlogCard(props: BLOGMODEL) {
  let default_link =
    "https://images.pexels.com/photos/15202105/pexels-photo-15202105/free-photo-of-a-person-with-legs-raised-in-a-field.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load";
  let img_link = getUrl(props, props.cover);
  return (
    <div className="w-sx clickable">
      <img src={img_link} className="w-full object-cover h-[200px] rounded-xl" alt="" />
      {/* <p className="badge badge-soft badge-primary mt-2">UI/UX</p> */}
      <div className="gap-2 flex flex-col mt-2">
        <h2 className="font-bold truncate text-lg">{props.title}</h2>
        <div className="flex items-center">
          <div className={"size-6 rounded-full bg-red-200"}></div>
          <p className="ml-2 text-sm font-bold fade">{ props.expand.user_id.username}</p>
        </div>
      </div>
    </div>
  );
}
