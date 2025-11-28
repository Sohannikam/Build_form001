import { atom } from "recoil";

export const layoutState = atom({
  key: "layoutState",
  default: {
    layout: null,
    leftWidth: 60,
    topHeight: 30,
  },
});
