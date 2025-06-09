import { useRouteLoaderData } from "react-router";

export default function UserAvatar() {
  let user = useRouteLoaderData("root");
  if (!user) return null;
  return <div className="size-8 rounded-full bg-primary middle ">D</div>;
}
