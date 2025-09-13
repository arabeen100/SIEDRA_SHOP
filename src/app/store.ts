import { configureStore } from '@reduxjs/toolkit';
import  {apiSlice } from '../features/api/apiSlice';
import tokenReducer from "../features/login/token"
import sideBarReducer from "../features/sidebar/sideBar"
import filtersReducer from "../features/filters/filtersSlice"
export const store = configureStore({
    reducer:{
            [apiSlice.reducerPath]: apiSlice.reducer,
            token:tokenReducer,
            sideBar:sideBarReducer,
            filters:filtersReducer, 

    },
     middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch