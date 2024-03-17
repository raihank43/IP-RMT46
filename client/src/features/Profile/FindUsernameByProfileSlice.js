import { createSlice } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";
import showToastSuccess from "../../../utils/toastSucces";
import { socket } from "../../socket";

const initialState = {
  username: "",
};

export const findUsernameByProfile = createSlice({
  name: "Profile",
  initialState,
  reducers: {
    setReceiverUsername: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const { setReceiverUsername } = findUsernameByProfile.actions;

export const findProfiles = (username) => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: "/profile",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const findUsername = data.find((el) => el.User.username === username)
        ?.User.username;
      dispatch(setReceiverUsername(findUsername));
    } catch (error) {
      console.log(error);
    }
  };
};

export default findUsernameByProfile.reducer;
