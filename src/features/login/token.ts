import { createSlice,  } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface LoginState {
  token: string;
}

const initialState: LoginState = {
  token: localStorage.getItem("userToken") || "",
};

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken: (state, { payload }: PayloadAction<string>) => {
      state.token = payload;
    },
    setItem: (state) => {
      localStorage.setItem("userToken", state.token);
    },
  },
});

// 3️⃣ نصدّر الـ reducer والـ actions
export default tokenSlice.reducer;
export const { setToken, setItem } = tokenSlice.actions;
