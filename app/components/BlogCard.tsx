import { XIcon } from "lucide-react";
import { useRef } from "react";
import { Link, useRouteLoaderData } from "react-router";
import { toast } from "sonner";
import type { BLOGMODEL } from "types/types";
import { getUrl } from "~/client/pocketbase";

export default function BlogCard(props: BLOGMODEL) {
  let default_link =
    "https://images.pexels.com/photos/15202105/pexels-photo-15202105/free-photo-of-a-person-with-legs-raised-in-a-field.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load";
  let img_link = getUrl(props, props.cover);
  let user = useRouteLoaderData("root");
  let dialogRef = useRef<HTMLDialogElement>(null);
  return (
    <div className="relative isolate">
      {user.id == props.user_id && (
        <button
          className="absolute btn btn-error right-0 btn-sm m-2 z-10"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            dialogRef.current?.showModal();
          }}
        >
          Delete
        </button>
      )}
      <dialog className="modal" ref={dialogRef}>
        <div className="modal-box">
          <div className="flex items-center mb-4">
            <h3 className="font-bold text-lg ">Confirm Deletion</h3>
            <button className="btn btn-circle ml-auto">
              <XIcon size={18} />
            </button>
          </div>
          <p className="mb-4">Are you sure you want to delete this post?</p>
          <div className="bg-base-300 p-3 rounded-lg mb-6">
            <span className="font-medium">Title: </span>
            <span>{props.title}</span>
          </div>
          <div className="modal-action">
            <>
              <button className="btn btn-ghost mr-2">Cancel</button>
              <button
                className="btn btn-error"
                onClick={async (e) => {
                  let btn = e.target as HTMLButtonElement;
                  btn.disabled = true;

                  let form = new FormData();
                  form.append("id", props.id);
                  try {
                    let resp = await fetch("/api/post/delete", {
                      method: "POST",
                      body: form,
                    });
                    if (!resp.ok) {
                      toast.error("delete failed");
                    } else {
                      toast.success("deleted");
                      window.location.reload()
                    }
                  } finally {
                    btn.disabled = false;
                  }
                }}
              >
                Delete
              </button>
            </>
          </div>
        </div>
      </dialog>
      <Link to={`/post/${props.id}`} className="relative">
        <img
          src={img_link}
          className="w-full object-cover h-[200px]  rounded-xl"
          alt=""
        />
        <div className="mx-2">
          <h2 className="font-bold step mb-2  mt-1 line-clamp-1">
            {props.title}
          </h2>
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
    </div>
  );
}
