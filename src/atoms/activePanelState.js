import { atom } from "recoil";

export const activePanelState = atom({
  key: "activePanelState",
  default: null // "panel1" | "panel2" | "normal"
});
