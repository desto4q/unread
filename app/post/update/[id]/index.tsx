import { ArrowLeftIcon, XIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import {
  redirect,
  useLoaderData,
  useNavigate,
  type LoaderFunctionArgs,
} from "react-router";
import { toast } from "sonner";
import { db, getUrl } from "~/client/pocketbase";
import { useMarkdownUploader } from "~/client/store";

export async function loader({ request, params }: LoaderFunctionArgs) {
  let { id } = params;
  if (!id) return redirect("/");
  let client = db();
  let post = await client.collection("posts").getOne(id);
  return post;
}

export default function index() {
  let resp = useLoaderData();
  let { temp } = useMarkdownUploader();
  let [image_url, setImage] = useState<string | undefined>(
    getUrl(resp, resp.cover)
  );
  let [isDragOver, setIsDragOver] = useState(false);
  let coverRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (file.size > 5000000) {
      return toast.error("file must be less than 5mb");
    }
    let url = URL.createObjectURL(file);
    setImage(url);
    // Set the file to the input element
    if (coverRef.current) {
      const dt = new DataTransfer();
      dt.items.add(file);
      coverRef.current.files = dt.files;
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));

    if (imageFile) {
      handleFile(imageFile);
    } else {
      toast.error("Please drop an image file");
    }
  }, [handleFile]);

  let onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    let form = e.currentTarget as HTMLFormElement;
    let formData = new FormData(form);
    formData.append("post", temp);
    formData.append("id", resp.id);
    let response = await fetch("/api/post/update", {
      method: "POST",
      credentials: "include",
      body: formData,
    });
    if (!response.ok) {
      toast.error("Upload failed");
      return;
    }
    let data = await response.json();
    toast.success("Upload successful");
    console.log(data);
  };
  let nav = useNavigate();
  useEffect(() => {
    console.log(resp);
  }, []);
  return (
    <div className=" container mx-auto">
      <div className="h-16 flex items-center step px-4 md:px-0">
        <button
          onClick={() => {
            nav(-1);
          }}
          className="btn mr-2"
        >
          <ArrowLeftIcon size={18} /> Back
        </button>
        <h2 className="text-lg font-bold fade">
          Update : <span className="fade text-xl">{resp.id}</span>
        </h2>
      </div>
      <div className="flex flex-col md:flex-row gap-2 mt-4 px-4 md:px-0">
        <div className="w-full   md:max-w-lg bg-base-300 p-2">
          <form action="" method="post" onSubmit={onSubmit}>
            <div
              className={`bg-base-100 w-full aspect-video rounded relative isolate border-2 border-dashed transition-colors ${
                isDragOver ? 'border-primary bg-primary/10' : 'border-transparent'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <button
                className="z-10 absolute right-0 top-0 m-2 btn btn-circle btn-error"
                onClick={(e) => {
                  e.preventDefault();
                  if (!coverRef.current) return;
                  if (coverRef.current) {
                    coverRef.current.value = "";
                  }
                  setImage(undefined);
                }}
              >
                <XIcon />
              </button>
              {!image_url && (
                <label
                  htmlFor="cover_img"
                  className={`w-full h-full grid-center cursor-pointer hover:bg-primary duration-500 transition-colors ${
                    isDragOver ? 'bg-primary/20' : ''
                  }`}
                >
                  {isDragOver ? 'Drop image here' : 'Cover Image'}
                </label>
              )}
              {image_url && (
                <img src={image_url} className="w-full h-full object-cover rounded-md" />
              )}
            </div>
            <div className="mt-2">
              <div className="label block py-1 text-lg font-bold">Title</div>
              <input
                name="title"
                type="text"
                className="input w-full"
                placeholder="Title here"
                defaultValue={resp.title}
              />
            </div>
            <input
              ref={coverRef}
              onChange={(e) => {
                let file = e.target.files?.[0];
                if (!file) return;
                handleFile(file);
              }}
              type="file"
              className="mt-2 file-input w-full"
              id="cover_img"
              name="cover"
              accept="image/*"
            />
            <button className="btn btn-block mt-2 btn-primary">Update</button>
          </form>
        </div>
        <div className="flex-1 prose max-w-full overflow-hidden">
          <Markdown>{temp}</Markdown>
        </div>
      </div>
    </div>
  );
}
