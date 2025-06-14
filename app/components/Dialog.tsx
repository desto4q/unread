import { XIcon } from "lucide-react";
import {
  useEffect,
  type PropsWithChildren,
  type PropsWithoutRef,
  type RefObject,
} from "react";
import { toast } from "sonner";
import { useDelete } from "~/client/store";

export interface DIALOG extends PropsWithChildren {
  dialogRef: RefObject<HTMLDialogElement | null>;
}
export default function Dialog(props: DIALOG) {
  let closeModal = () => props.dialogRef.current?.close();
  let { item } = useDelete();
  return (
    <dialog className="modal" ref={props.dialogRef} onClick={closeModal}>
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
          <span>{item?.title}</span>
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
                if (!item?.id) return toast.error("no item");
                btn.disabled = true;
                let form = new FormData();
                form.append("id", item.id);
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
  );
}
