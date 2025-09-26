import { configureStore } from '@reduxjs/toolkit';
import  {apiSlice } from '../features/api/apiSlice';
import tokenReducer from "../features/login/token"
import sideBarReducer from "../features/sidebar/sideBar"
import filtersReducer from "../features/filters/filtersSlice"
import couponReducer from "../features/coupon/coupon"
import orderReducer from '../features/order/order';
import ProductsReducer from '../features/product/products';
export const store = configureStore({
    reducer:{
            [apiSlice.reducerPath]: apiSlice.reducer,
            token:tokenReducer,
            sideBar:sideBarReducer,
            filters:filtersReducer,
            coupon:couponReducer, 
            order:orderReducer,
            products:ProductsReducer,

    },
     middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch