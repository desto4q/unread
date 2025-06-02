import path from "path";
import fs from "fs";
import Markdown from "react-markdown";
import { useLoaderData } from "react-router";
import remarkGfm from "remark-gfm";


export async function loader() {
  const filePath = path.join(process.cwd(), "public", "md.txt");
  let text = fs.readFileSync(filePath, "utf8");
  return text;
}
export default function index() {
  let text = useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-center">
        <div className="w-full max-w-3xl">
          <div className="bg-base-300 h-[452px] w-full  mb-8"></div>
          <div className="prose  max-w-full">
            <Markdown remarkPlugins={[remarkGfm]}>{text}</Markdown>
          </div>
        </div>
      </div>
    </div>
  );
}
