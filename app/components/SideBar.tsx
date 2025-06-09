import { Link, useRouteLoaderData } from "react-router";
import Drawer from "./Drawer";
import { Menu, MenuIcon, XIcon } from "lucide-react";
import { useDrawerState } from "~/client/store";

let links = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Blog",
    path: "/blog",
  },
  {
    name: "profile",
    path: "/user/profile",
  },
  {
    name: "Faq's",
    path: "/",
  },
];
export default function SideBar() {
  let { closeDrawer } = useDrawerState();
  let user = useRouteLoaderData("root");

  return (
    <Drawer>
      <nav className="flex-1  flex flex-col">
        <div className="flex  items-center step h-18">
          <h2 className="flex items-center text-xl px-2 font-bold ">Unread</h2>
          <div
            className="btn btn-square ml-auto btn-ghost"
            onClick={closeDrawer}
          >
            <XIcon size={18}></XIcon>
          </div>
        </div>
        <div className=" flex flex-col gap-2 bg-base-300 flex-1 py-2">
          {links.map((link) => (
            <Link
              to={link.path}
              viewTransition
              className="btn  justify-start capitalize btn-ghost btn-primary"
              key={link.name}
            >
              {link.name}
            </Link>
          ))}
          {user && (
            <Link
              to={"/post/create"}
              viewTransition
              className="btn  justify-start capitalize btn-ghost btn-primary"
            >
              Create
            </Link>
          )}
        </div>
        <Link
          to={"/api/auth/logout"}
          onClick={() => {
            setTimeout(() => {
              return closeDrawer();
            }, 500);
          }}
          className="btn mt-auto btn-error"
        >
          Logout
        </Link>
      </nav>
    </Drawer>
  );
}
