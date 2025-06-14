import { atom, useAtom } from "jotai";
import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import type { BLOGMODEL } from "types/types";
let md_atom = atom<string>("");

export function useMarkdownUploader() {
  let [temp, setTemp] = useAtom(md_atom);
  let updateTemp = (md: string) => {
    setTemp(md);
  };
  useEffect(() => {
    let prev = localStorage.getItem("temp");
    if (prev) {
      if (prev == temp) return;
      setTemp(prev);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("temp", temp);
  }, [temp]);
  return { temp, updateTemp };
}

export let date_formatter = (date_string: string) => {
  return new Date(date_string).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
export function useClientHeight() {
  let [height, setHeight] = useState(0);
  useLayoutEffect(() => {
    setHeight(document.documentElement.scrollHeight - 80);
  }, []);

  return { height };
}
export let side_bar_atom = atom(false);
export function useDrawerState() {
  let [open, setOpen] = useAtom(side_bar_atom);

  let openDrawer = () => {
    setOpen(true);
  };
  let closeDrawer = () => {
    setOpen(false);
  };

  return {
    open,
    openDrawer,
    closeDrawer,
    toggleDrawer: () => {
      setOpen(!open);
    },
  };
}

let item_atom = atom<BLOGMODEL | null>(null);
export let useDelete = () => {
  let [item, setItem] = useAtom<BLOGMODEL | null>(item_atom);
  return { setItem, item };
};
