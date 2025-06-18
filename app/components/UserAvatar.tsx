import { Link, useRouteLoaderData } from "react-router";

export default function UserAvatar() {
  let user = useRouteLoaderData("root");
  if (!user) return null;
  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn m-1 btn-circle btn-soft btn-primary capitalize"
      >
        {user.email[0]}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm *:my-1"
      >
        <li>
          <Link to={"/user/profile"} className="btn btn-glow btn-accent">
            Profile
          </Link>
        </li>
        <li>
          <Link to={"/api/auth/logout"} className="btn btn-error">
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}
