import { configureStore, createSlice } from "@reduxjs/toolkit";
import directMessageReducer from "./features/DirectMessage/DirectMessageSlice";
import findUsernameByProfileReducer from "./features/Profile/FindUsernameByProfileSlice";
import registerSliceReducer from "./features/User/RegisterSlice";
import loginSliceReducer from "./features/User/LoginSlice";
import PublicMessageReducer from "./features/PublicMessage/PublicMessageSlice";
import ProfileReducer from "./features/Profile/ProfileSlice";
import CurrentlyLoggedProfileReducer from "./features/User/CurrentlyLoggedProfile";

export const store = configureStore({
  reducer: {
    directMessages: directMessageReducer,
    receiver: findUsernameByProfileReducer,
    userData: registerSliceReducer,
    loginData: loginSliceReducer,
    pubMessage: PublicMessageReducer,
    profileData: ProfileReducer,
    currentlyLoggedProfile: CurrentlyLoggedProfileReducer,
  },
});
