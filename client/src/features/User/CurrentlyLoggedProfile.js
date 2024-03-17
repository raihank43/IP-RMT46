import { createSlice } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";
import showToastSuccess from "../../../utils/toastSucces";
import { socket } from "../../socket";
import toastFailed from "../../../utils/toastFailed";

const initialState = {
  userDataLogin: {},
};

export const currentlyLoggedProfile = createSlice({
  name: "CurrentlyLoggedProfile",
  initialState,
  reducers: {
    setLoggedProfile: (state, action) => {
      state.userDataLogin = action.payload;
    },
  },
});

export const { setLoggedProfile } = currentlyLoggedProfile.actions;

export const fetchLoggedProfile = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: "/user",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(setLoggedProfile(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export default currentlyLoggedProfile.reducer;
