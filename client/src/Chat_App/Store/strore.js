import { configureStore } from "@reduxjs/toolkit";
import ChatSlice from "../feature/ChatSlice";

export const Store = configureStore({
     reducer :{
        chat:ChatSlice
     } 

})