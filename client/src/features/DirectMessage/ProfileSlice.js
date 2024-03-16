import { createSlice } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";
import showToastSuccess from "../../../utils/toastSucces";
import { socket } from "../../socket";

const initialState = {
  profileList: [],
};

export const profileSlice = createSlice({
  name: "Profile",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profileList = action.payload;
    },
  },
});

export const { setProfile } = profileSlice.actions;

export const fetchProfiles = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: "/profile",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(setProfile(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const createProfile = (nav, formData) => {
  return async () => {
    try {
      const response = await axios.post(`/profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      nav("/");
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateProfile = (nav, formData, username) => {
  return async () => {
    try {
      const response = await axios.put(`/profile/${username}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      showToastSuccess("Profile updated succesfully.");
      nav("/");
    } catch (error) {
      console.error(error);
    }
  };
};

export default profileSlice.reducer;
