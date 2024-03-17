import { createSlice } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";
import showToastSuccess from "../../../utils/toastSucces";
import { socket } from "../../socket";
import toastFailed from "../../../utils/toastFailed";

const initialState = {
  pubMessageList: [],
};

export const pubMessageSlice = createSlice({
  name: "PublicMessage",
  initialState,
  reducers: {
    setPubMessage: (state, action) => {
      state.pubMessageList = action.payload;
    },
  },
});

export const { setPubMessage } = pubMessageSlice.actions;

export const fetchPublicMessage = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: "/group",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(setPubMessage(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const sendPublicMessage = (file, sendPubMessage, sender) => {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("text", sendPubMessage);
      const response = await axios.post(`/group`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response)
      socket.emit("sendMessage", {
        message: `From ${sender.currentUsername}: ${response.data.text}`,
        sender: sender.currentUsername,
      });
    } catch (error) {
      console.log(error);
      toastFailed(error.response?.data?.message || error.message, "error");
    }
  };
};

export const deleteMessageOnPub = (id) => {
  return async (dispatch) => {
    try {
      await axios({
        url: `/group/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      socket.emit("deleteMessage", "Message Deleted Successfully");
      showToastSuccess("Success deleted message.");
    } catch (error) {
      console.log(error);
    }
  };
};

export default pubMessageSlice.reducer;
