import { createSlice,  } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface LoginState {
  coupon: string;
  apply:boolean;
}

const initialState: LoginState = {
  coupon:"",
  apply:false,
};

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    setCoupon: (state, { payload }: PayloadAction<string>) => {
      state.coupon = payload;
    },
        setApply: (state, { payload }: PayloadAction<boolean>) => {
      state.apply = payload;
    },

    
  },
});

export default couponSlice.reducer;
export const { setApply, setCoupon } = couponSlice.actions;
