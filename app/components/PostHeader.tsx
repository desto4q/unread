import { useSearchParams } from "react-router";

export default function PostHeader({ title }: { title?: string }) {
  let [searchParams, setSeachParams] = useSearchParams();
  return (
    <div className="h-18 flex items-center step sticky top-0 px-4 md:px-0">
      <h2 className="text-xl font-bold capitalize">{title ?? "Post"}</h2>
      <div className="ml-auto ">
        <select
          className="select"
          defaultValue={"default"}
          onChange={(e) => {
            console.log(e.target.value);

            searchParams.set("sort", e.target.value);
            if (e.target.value == "") searchParams.delete("sort");
            setSeachParams(searchParams);
          }}
        >
          <option value={""}>Default</option>
          <option className="" value={"-created"}>
            oldest
          </option>
          <option className="" value={"view_id.views"}>
            Views: Highest
          </option>
          <option className="" value={"-view_id.views"}>
            Views: Lowest
          </option>
        </select>
      </div>
    </div>
  );
}
