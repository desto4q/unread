import PocketBase, { ClientResponseError } from "pocketbase";
import { useEffect } from "react";
import { useActionData } from "react-router";
import { toast } from "sonner";
// export let db = () => {
//   return new PocketBase("http://104.198.161.24:8090");
// };
export let db = () => {
  return new PocketBase("http://127.0.0.1:8090");
};

export function useResponse() {
  let resp = useActionData();
  let logger = () => {
    if (resp?.error) toast.error(resp.error);
    if (resp?.message) toast.success(resp.message);
  };

  useEffect(() => {
    logger();
  }, [resp]);
}

export let errorHandler = (err: any) => {
  if (err instanceof ClientResponseError)
    return Response.json({ error: err.message, status: err.status });
  return Response.json(
    { error: "internal server error" },
    {
      status: 500,
    },
  );
};
export let get_cookie = (req: Request) => req.headers.get("cookie");
