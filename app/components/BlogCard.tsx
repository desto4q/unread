import Markdown from "react-markdown";
import { Link, useNavigate, useRouteLoaderData } from "react-router";
import type { BLOGMODEL } from "types/types";
import { getUrl } from "~/client/pocketbase";
import { useDialogContext } from "~/client/Providers";
import { useDelete } from "~/client/store";

export default function BlogCard(props: BLOGMODEL) {
  let img_link = getUrl(props, props.cover);
  let user = useRouteLoaderData("root");
  let { openModal } = useDialogContext();
  let { item, setItem } = useDelete();
  let nav = useNavigate();
  return (
    <div className="relative isolate rounded-2xl shadow-xl overflow-hidden">
      {user?.id == props.user_id && (
        <button
          className="absolute btn btn-error right-0 btn-sm m-2 z-10 shadow-xl"
          onClick={(e) => {
            setItem(props);
            openModal();
          }}
        >
          Delete
        </button>
      )}

      <Link to={`/post/${props.id}`} className="relative flex flex-col">
        <img
          src={img_link}
          className="w-full object-cover h-[140px] rounded-2xl "
          alt=""
        />
        <div className="mx-2 px-2 flex flex-col py-2  gap-2 mt-4">
          <h2 className="font-black line-clamp-1 capitalize ">{props.title}</h2>
          <div className="prose line-clamp-2 text-sm">
            <Markdown>{props.post}</Markdown>
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              let to = `/post/user/${props.user_id}`;
              return nav(to, {
                viewTransition: true,
              });
            }}
            className=" btn-sof mt-4 mb-4 flex justify-start h-fit py-2 btn  btn-glow btn-primary  "
          >
            <div className="flex size-8 badge badge-soft badge-primary rounded-md">
              <div className="grid-center capitalize font-bold fade">
                {props.expand.user_id.username[0]}
              </div>
            </div>
            <div className="ml-2 flex flex-col items-start ">
              <h2 className="capitalize font-semibold fade text-sm">
                {props.expand.user_id.username}
              </h2>
              <p className="text-xs font-bold fade-md">
                {new Date(props.created).toDateString()}
              </p>
            </div>
          </button>
        </div>
      </Link>
    </div>
  );
}
