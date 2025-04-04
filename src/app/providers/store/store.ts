import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/entities/auth/model/authSlice"
import filterReducer from "@/entities/filters/model/filterSlice"
export const store = configureStore({
    reducer: {
    auth: authReducer,
    filters:filterReducer
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;