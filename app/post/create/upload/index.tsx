import { ArrowLeftIcon, XIcon } from "lucide-react";
import { useRef, useState } from "react";
import Markdown from "react-markdown";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useMarkdownUploader } from "~/client/store";

export default function index() {
  let { temp } = useMarkdownUploader();
  let [image_url, setImage] = useState<string | undefined>(undefined);
  let [isDragOver, setIsDragOver] = useState(false);
  let coverRef = useRef<HTMLInputElement>(null);
  let onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    let form = e.currentTarget as HTMLFormElement;
    let formData = new FormData(form);
    let title = formData.get("title") as string;
    formData.append("post", temp);
    if (!title) return toast.error("Title is required");
    let cover = formData.get("cover") as File;
    if (!cover) return toast.error("Cover image is required");
    let response = await fetch("/api/post", {
      method: "POST",
      credentials: "include",
      body: formData,
    });
    if (!response.ok) {
      return toast.error("Upload failed");
    }
    let data = await response.json();
    toast.success("Upload successful");
    console.log(data);
    nav("/user/profile/", {
      viewTransition: true,
    });
  };
  let nav = useNavigate();

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return toast.error("Please upload an image file");
    }

    handleFileChange(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // Only set isDragOver to false if we're leaving the drop zone entirely
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragOver(false);
    }
  };

  const handleFileChange = (file: File) => {
    if (file.size > 5000000) {
      return toast.error("File must be less than 5MB");
    }

    // Clean up previous URL to prevent memory leaks
    if (image_url) {
      URL.revokeObjectURL(image_url);
    }

    const url = URL.createObjectURL(file);
    setImage(url);

    // Hack to set file to input
    if (coverRef.current) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      coverRef.current.files = dataTransfer.files;
    }
  };

  const handleRemoveImage = () => {
    if (image_url) {
      URL.revokeObjectURL(image_url);
    }
    if (coverRef.current) {
      coverRef.current.value = "";
    }
    setImage(undefined);
  };

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
        <h2 className="text-xl font-bold fade">Upload</h2>
      </div>
      <div className="flex flex-col md:flex-row gap-2 mt-4 px-4 md:px-0">
        <div className="w-full   md:max-w-lg bg-base-300 p-2">
          <form action="" method="post" onSubmit={onSubmit}>
            <div
              className={`bg-base-100 w-full aspect-video rounded relative isolate border-2 border-dashed transition-colors ${
                isDragOver ? 'border-primary bg-primary/10' : 'border-base-content/20'
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
            >
              {image_url && (
                <button
                  type="button"
                  className="z-10 absolute right-0 top-0 m-2 btn btn-circle btn-error btn-sm"
                  onClick={handleRemoveImage}
                >
                  <XIcon size={16} />
                </button>
              )}
              {!image_url && (
                <label
                  htmlFor="cover_img"
                  className={`w-full h-full grid-center cursor-pointer hover:bg-primary/5 duration-300 transition-colors flex flex-col items-center justify-center text-center p-4 ${
                    isDragOver ? 'text-primary' : 'text-base-content/70'
                  }`}
                >
                  <div className="text-lg font-medium mb-2">
                    {isDragOver ? 'Drop image here' : 'Drag & drop image here'}
                  </div>
                  <div className="text-sm opacity-70">
                    or click to browse (max 5MB)
                  </div>
                </label>
              )}
              {image_url && (
                <img
                  src={image_url}
                  alt="Cover preview"
                  className="w-full h-full object-cover rounded"
                />
              )}
            </div>
            <div className="mt-2">
              <div className="label block py-1 text-lg font-bold">Title</div>
              <input
                name="title"
                type="text"
                id="title"
                className="input w-full"
                placeholder="Title here"
              />
            </div>
            <input
              ref={coverRef}
              onChange={(e) => {
                let file = e.target.files?.[0];
                if (!file) return;
                handleFileChange(file);
              }}
              accept="image/*"
              type="file"
              className="mt-2 file-input w-full"
              id="cover_img"
              name="cover"
            />
            <div className="form-control w-full mt-2">
              <input
                type="select"
                name="tags_input"
                id="tags_input"
                list="tags"
                className="input w-full"
                placeholder="tags"
              />
              {/* <datalist className="bg-white" id="tags">
                {!tags_query.isFetching &&
                  tags_query.data &&
                  tags_query.data.map((tag) => <option>{tag.tag}</option>)}
              </datalist> */}
            </div>
            <button className="btn btn-block mt-2 btn-primary">Upload</button>
          </form>
        </div>
        <div className="flex-1 prose max-w-full overflow-hidden">
          <Markdown>{temp}</Markdown>
        </div>
      </div>
    </div>
  );
}
