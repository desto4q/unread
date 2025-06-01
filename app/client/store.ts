import { atom, useAtom } from "jotai";
import { useEffect } from "react";

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
