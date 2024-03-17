import { createSlice } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";
import showToastSuccess from "../../../utils/toastSucces";
import { socket } from "../../socket";
import toastFailed from "../../../utils/toastFailed";

const initialState = {
  dataUser: {},
};

export const registerSlice = createSlice({
  name: "Register",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.dataUser = action.payload;
    },
  },
});

export const { setUserData } = registerSlice.actions;

export const registerSubmit = (nav, userData) => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: "/register",
        method: "POST",
        data: userData,
      });
      showToastSuccess("Register Success! Please Login.");
      nav("/login");
    } catch (error) {
      console.log(error);
      toastFailed(error.response?.data?.message || error.message, "error");
    }
  };
};

export default registerSlice.reducer;
