import type { PropsWithChildren } from "react";

export default function Center({ children }: PropsWithChildren) {
  return (
    <div className="screen bg-base-300 flex">
      <div className=" flex-1 grid place-items-center p-4">{children}</div>
    </div>
  );
}
