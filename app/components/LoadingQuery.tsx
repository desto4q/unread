import type { PropsWithChildren } from "react";

interface QueryState extends PropsWithChildren {
  isFetching: boolean;
  isError: boolean;
  data: boolean;
  refetch: () => any;
  className?: string;
}

export default function LoadingQuery(props: QueryState) {
  if (props.isFetching) {
    return (
      <div
        className={
          "grid-center container min-h-[342px] mx-auto bg-base-200 " +
          props.className
        }
      >
        <h2 className="">loading </h2>
      </div>
    );
  }

  if (props.isError) {
    <div
      className={
        "grid-center container min-h-[342px] mx-auto bg-base-200 " +
        props.className
      }
    >
      <div>
        <h2>Failed</h2>
        <button className="btn btn-accent " onClick={props.refetch}>
          Refetch
        </button>
      </div>
    </div>;
  }

  return <>{props.children}</>;
}
