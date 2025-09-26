import { createSlice,  } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface OrderState {
  orderId: string;
}

const initialState: OrderState = {
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

export default orderSlice.reducer;
export const {setOrderId} = orderSlice.actions;
