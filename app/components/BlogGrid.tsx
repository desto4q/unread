import type { PropsWithChildren } from "react";

export default function BlogGrid({ children }: PropsWithChildren) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-8">
      {children}
    </div>
  );
}
