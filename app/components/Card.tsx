export default function Card() {
  let img_link =
    "https://images.pexels.com/photos/15202105/pexels-photo-15202105/free-photo-of-a-person-with-legs-raised-in-a-field.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load";
  return (
    <div className="w-sx clickable">
      <img src={img_link} className="w-full h-[200px] rounded-xl" alt="" />
      <p className="badge badge-soft badge-primary mt-2">UI/UX</p>
      <div className="gap-2 flex flex-col mt-2">
        <h2 className="font-bold truncate text-lg">Blog Title</h2>
        <p className="text-sm line-clamp-2 fade">
          Lorem ipsum is placeholder text commonly used in the graphic, print,
          and publishing industries for previewing layouts and visual mockups.
        </p>
        <div className="flex items-center mt-2">
          <div className={"size-6 rounded-full bg-red-200"}></div>
          <p className="ml-2 text-sm font-bold fade">Damien James</p>
        </div>
      </div>
    </div>
  );
}
