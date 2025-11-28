import { atom } from "recoil";

export const panelsState = atom({
  key: "panelsState",
  default: {
    panel1: { type: "empty", image: null, fields: [] },
    panel2: { type: "empty", image: null, fields: [] }
  }
});
