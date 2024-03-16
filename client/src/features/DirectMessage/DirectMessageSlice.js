import { createSlice } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";
import showToastSuccess from "../../../utils/toastSucces";
import { socket } from "../../socket";

const initialState = {
  allPrivMessage: [],
};

export const directMessageSlice = createSlice({
  name: "DirectMessage",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.allPrivMessage = action.payload;
    },
  },
});

//? didestruct dari reducers, harus dipake diatas karena biar dibawahnya bisa dipake
export const { setMessage } = directMessageSlice.actions;

// fetch privMessage between logged user and other user by username
export const fetchDirectMessages = (username) => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `/${username}/message`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(setMessage(data));
    } catch (error) {
      console.log(error);
    }
  };
};

// delete privmessage using id
export const deletePrivMessageById = (id) => {
  return async (dispatch) => {
    try {
      await axios({
        url: `/${id}/message`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // const filteredData = message.filter((obj) => obj.id !== id);
      socket.emit("deleteMessage", "Message Deleted Successfully");
      showToastSuccess("Success deleted message.");
    } catch (error) {
      console.log(error);
    }
  };
};

// send privMessage between logged user and other user by username
export const sendPrivMessage = (username, sendMessage) => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `/${username}/message`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: { text: sendMessage },
      });
      socket.emit("sendMessage", `From ${username}: ${data.text}`);
    } catch (error) {
      console.log(error);
    }
  };
};

export default directMessageSlice.reducer;
