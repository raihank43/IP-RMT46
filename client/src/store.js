import { configureStore, createSlice } from "@reduxjs/toolkit";
import directMessageReducer from "./features/DirectMessage/DirectMessageSlice";
import findUsernameByProfileReducer from "./features/DirectMessage/FindUsernameByProfileSlice";
import registerSliceReducer from "./features/DirectMessage/RegisterSlice";
import loginSliceReducer from "./features/DirectMessage/LoginSlice";
import PublicMessageReducer from "./features/DirectMessage/PublicMessageSlice";
import ProfileReducer from "./features/DirectMessage/ProfileSlice";


export const store = configureStore({
  reducer: {
    directMessages: directMessageReducer,
    receiver: findUsernameByProfileReducer,
    userData: registerSliceReducer,
    loginData: loginSliceReducer,
    pubMessage: PublicMessageReducer,
    profileData: ProfileReducer
  },
});
