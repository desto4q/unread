import Markdown from "react-markdown";
import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import remarkGfm from "remark-gfm";

export async function loader({ request }: LoaderFunctionArgs) {
  let url = new URL("/md.txt", request.url);
  let response = await fetch(url.href);
  let text = response.text();
  return text;
}

export default function index() {
  let content = useLoaderData<typeof loader>();
  return (
    <div className="mx-auto container">
      <div className="mx-auto prose w-full max-w-full mt-12 pb-8">
        <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
      </div>
    </div>
  );
}
