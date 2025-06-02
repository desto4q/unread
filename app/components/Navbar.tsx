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
    name: "Product",
    path: "/",
  },
  {
    name: "Services",
    path: "/",
  },
  {
    name: "Faq's",
    path: "/",
  },
  {
    name: "Create",
    path: "/post/create",
  },
];
export default function NavBar() {
  let nav = useNavigate();
  let user = useRouteLoaderData("root");
  return (
    <div className="step px-4 md:px-0">
      <nav className="h-18 container mx-auto flex items-center gap-2">
        <h2 className=" font-bold text-xl">
          UR<span className="hidden md:inline">ead</span>
        </h2>
        <div className="mr-auto md:flex hidden ">
          {links.map((link) => (
            <Link to={link.path} key={link.name} className="btn btn-ghost">
              {link.name}
            </Link>
          ))}
        </div>
        <SearchBar />
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
