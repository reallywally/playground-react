import { atom } from "jotai";

export const projectAtom = atom("");

export const projectListAtom = atom([
  { value: "PRJ0000001", text: "테스트 프로젝트1" },
  { value: "PRJ0000002", text: "테스트 프로젝트2" },
]);
