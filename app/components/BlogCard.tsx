import { XIcon } from "lucide-react";
import { useRef, type PropsWithChildren } from "react";
import Markdown from "react-markdown";
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
  let closeModal = () => dialogRef.current?.close();
  return (
    <div className="relative isolate rounded-2xl shadow-xl overflow-hidden">
      {user?.id == props.user_id && (
        <button
          className="absolute btn btn-error right-0 btn-sm m-2 z-10 shadow-xl"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            dialogRef.current?.showModal();
          }}
        >
          Delete
        </button>
      )}
      <dialog className="modal" ref={dialogRef} onClick={closeModal}>
        <div
          className="modal-box"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="flex items-center mb-4">
            <h3 className="font-bold text-lg ">Confirm Deletion</h3>
            <button className="btn btn-circle ml-auto" onClick={closeModal}>
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
              <button className="btn btn-ghost mr-2" onClick={closeModal}>
                Cancel
              </button>
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
                      window.location.reload();
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
      <Link
        to={`/post/${props.id}`}
        className="relative flex flex-col"
      >
        <img
          src={img_link}
          className="w-full object-cover h-[140px] rounded-2xl "
          alt=""
        />
        <div className="mx-2 px-2 flex flex-col py-2  gap-2 mt-4">
          <div className="flex items-center">
            <p className="badge badge-primary badge-soft capitalize badge-sm">front-end</p>
          </div>
          <h2 className="font-black line-clamp-1">{props.title}</h2>
          <div className="prose line-clamp-2 text-sm">
            <Markdown>{props.post}</Markdown>
          </div>
          <div className="flex items-center mt-4 mb-4">
            <div className="aspect-square size-8 bg-base-300"></div>
            <div className="ml-2">
              <h2 className="capitalize font-semibold fade text-sm">
                {props.expand.user_id.username}
              </h2>
              <p className="text-xs font-bold fade-md">{new Date(props.created).toDateString()}</p>
            </div>
          </div>
          {/* //@ts-ignore */}
        </div>
      </Link>
    </div>
  );
}
