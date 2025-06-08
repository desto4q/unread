import { useParams } from "react-router";

export default function index() {
  let { author } = useParams();
  return <div>{author}</div>;
}
