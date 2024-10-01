import { UserType } from "@/api/auth/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AccountState {
  token: string;
  user: UserType | null;
}

const initialState: AccountState = {
  token: "",
  user: null,
};
export const AccountSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
      state.user = initialState.user;
    },
    saveProfile: (state, action: PayloadAction<{ user: UserType }>) => {
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.user = initialState.user;
      state.token = initialState.token;
    },
  },
});
// Action creators are generated for each case reducer function
export const { login, logout, saveProfile } = AccountSlice.actions;

export default AccountSlice.reducer;
