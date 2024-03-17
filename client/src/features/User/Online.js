import { createSlice } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";
import showToastSuccess from "../../../utils/toastSucces";
import { socket } from "../../socket";
import toastFailed from "../../../utils/toastFailed";

const initialState = {
  online: false,
};

export const OnlineOrOffline = createSlice({
  name: "OnlineOrOffline",
  initialState,
  reducers: {
    setOnline: (state, action) => {
      state.online = action.payload;
    },
  },
});

export const { setOnline } = OnlineOrOffline.actions;

export default OnlineOrOffline.reducer;
