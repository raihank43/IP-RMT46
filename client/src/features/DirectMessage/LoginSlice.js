import { createSlice } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";
import showToastSuccess from "../../../utils/toastSucces";
import { socket } from "../../socket";
import toastFailed from "../../../utils/toastFailed";

const initialState = {
  dataLogin: {},
};

export const loginSlice = createSlice({
  name: "Login",
  initialState,
  reducers: {
    setLoginData: (state, action) => {
      state.dataLogin = action.payload;
    },
  },
});

export const { setLoginData } = loginSlice.actions;

export const loginSubmit = (loginData, navigate) => {
  return async () => {
    try {
      let { data } = await axios({
        url: "/login",
        method: "POST",
        data: loginData,
      });

      localStorage.setItem("token", data.access_token);

      const findProfile = await axios({
        url: `/profile/${data.username}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!findProfile.data) {
        showToastSuccess("Success Login, Welcome to KoneksiON!");
        return navigate("/profile/create");
      }
      // fetchProfileFromLoggedUser(data.username);
      showToastSuccess("Success Login, Welcome to KoneksiON!");
      navigate("/");
    } catch (error) {
      console.log(error);
      toastFailed(error.response?.data?.message || error.message, "error");
    }
  };
};

export default loginSlice.reducer;
