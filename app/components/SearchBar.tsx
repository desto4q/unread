import { SearchIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function SearchBar() {
  let nav = useNavigate();
  let onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    let form = new FormData(e.target as HTMLFormElement);
    let search = form.get("search") as string;
    if (search.length < 3)
      return toast.error("Search term must be at least 3 characters long");
    return nav("/search/" + search);
  };
  return (
    <form className="join w-full" onSubmit={onSubmit}>
      <input
        className="join-item input w-full"
        name="search"
        // type="search"
        placeholder="search"
      ></input>
      <button className="btn join-item btn-primary btn-soft">
        <SearchIcon className="label" size={18} />
      </button>
    </form>
  );
}
