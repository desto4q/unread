import { ClientOnly } from "remix-utils/client-only";
import Editor from "~/components/Editor";

export default function index() {
  return (
    <div>
      <ClientOnly>
        {() => {
          let temp = localStorage.getItem("temp") || undefined;
          temp = temp ? temp : undefined;
          console.log(temp);
          return <Editor md={temp} />;
        }}
      </ClientOnly>
    </div>
  );
}
