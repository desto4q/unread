import { useEffect, type PropsWithChildren, type SyntheticEvent } from "react";
import { useDrawerState } from "~/client/store";

let stopPropagation = (e: SyntheticEvent) => {
  e.stopPropagation();
};
interface Drawer extends PropsWithChildren {
  open?: boolean;
  closeDrawer?: () => any;
}
export default function Drawer(props: Drawer) {
  let { open, closeDrawer } = useDrawerState();
  useEffect(() => {
    console.log(open);
  }, [open]);
  return (
    <div
      className={`fixed top-0 right-0 h-dvh w-full    z-50 flex ${
        open ? "bg-base-200/50 backdrop-blur-xs" : "pointer-events-none"
      }`}
      onClick={(e) => {
        console.log("backdrop");
        if (props.closeDrawer) return props.closeDrawer();
        closeDrawer();
      }}
    >
      <div
        className={`w-xs p-2 bg-base-200 flex flex-col ${
          !open && "translate-x-[-100%]"
        } duration-150`}
        onClick={stopPropagation}
      >
        {props.children}
      </div>
    </div>
  );
}
