import { createSlice,  } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface LoginState {
  orderId: string;
}

const initialState: LoginState = {
  orderId: "",
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderId: (state, { payload }: PayloadAction<string>) => {
      state.orderId = payload;
    },

  },
});

// 3️⃣ نصدّر الـ reducer والـ actions
export default orderSlice.reducer;
export const {setOrderId} = orderSlice.actions;
