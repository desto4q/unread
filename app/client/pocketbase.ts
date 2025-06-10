import PocketBase, { ClientResponseError, type RecordModel } from "pocketbase";
import { useEffect } from "react";
import { useActionData } from "react-router";
import { toast } from "sonner";
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
    }
  );
};
export let get_cookie = (req: Request) => req.headers.get("cookie");
let dummy_image_url =
  "https://images.pexels.com/photos/32131630/pexels-photo-32131630/free-photo-of-scenic-road-through-canadian-rockies-in-jasper.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load";
export function getUrl(record: RecordModel, name: string) {
  let client = db();
  return client.files.getURL(record, name) || dummy_image_url;
}

export function checkCookie(cookie: string, client: PocketBase) {
  client.authStore.loadFromCookie(cookie);
  if (!client.authStore.isValid) return;
  return client.authStore.record;
}
