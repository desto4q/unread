import { Link, useNavigate } from "react-router";
import UserAvatar from "./UserAvatar";
import { useRouteLoaderData } from "react-router";
import SearchBar from "./SearchBar";

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
export default function NavBar() {
  let nav = useNavigate();
  let user = useRouteLoaderData("root");
  return (
    <div className="step px-4 md:px-0">
      <nav className="h-18 container mx-auto flex items-center gap-2">
        <Link
          to={"/"}
          className=" font-bold text-xl btn inline_flex gap-0 btn-ghost btn-primary"
        >
          UR<span className="hidden md:inline">ead</span>
        </Link>
        <div className="mr-auto md:flex hidden ">
          {links.map((link) => (
            <Link to={link.path} key={link.name} className="btn btn-ghost">
              {link.name}
            </Link>
          ))}
          {user && (
            <Link to={"/post/create"} className="btn btn-ghost">
              create
            </Link>
          )}
        </div>
        <div className="ml-auto">
          <SearchBar />
        </div>
        <div className="block md:hidden">
          <UserAvatar />
        </div>
        <div className="hidden md:block">
          {user && (
            <div>
              <UserAvatar />
            </div>
          )}
          {!user && (
            <div className="center gap-2">
              <button
                className="btn btn-ghost"
                onClick={() => {
                  nav("/user/login");
                }}
              >
                Login
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  nav("/user/signup");
                }}
              >
                SignUp
              </button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
