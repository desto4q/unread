import type { LoaderFunctionArgs } from "react-router";
import { useLoaderData } from "react-router";
import { redirect } from "react-router";
import { db } from "~/client/pocketbase";
export async function loader({ request }: LoaderFunctionArgs) {
  let cookies = request.headers.get("cookie") ?? "";
  let client = db();
  client.authStore.loadFromCookie(cookies);

  if (!client.authStore.isValid) return redirect("/");
  let user = client.authStore.record;
  return user;
}

export default function index() {
  let response = useLoaderData<typeof loader>();
  return (
    <div className="">
      <div className="h-[240px] w-full  flex bg-base-300 relative isolate">
        <div className="absolute inset-0 bg-gradient-to-t from-neutral/25 -z-10"></div>
        <div className="container mx-auto mt-auto">
          <div className="flex items-center">
            <div className="size-18 bg-primary rounded-md "> </div>
            <div className="ml-2">
              <h2 className="text-lg font-bold  fade">UserName</h2>
              <p className="label">Email</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        <h2 className="fade text-xl font-bold">Profile</h2>
      </div>
    </div>
  );
}
