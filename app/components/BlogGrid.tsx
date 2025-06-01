import type { PropsWithChildren } from "react";

export default function BlogGrid({ children }: PropsWithChildren) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-8">
      {children}
    </div>
  );
}
