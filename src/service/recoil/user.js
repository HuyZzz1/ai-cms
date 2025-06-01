import { atom } from "recoil";

export const DEFAULT_USER_RECOIL_STATE = {
  _id: "",
  name: "",
  email: "",
  role: "",
};

export const userRecoil = atom({
  key: "userRecoilState",
  default: DEFAULT_USER_RECOIL_STATE,
});
