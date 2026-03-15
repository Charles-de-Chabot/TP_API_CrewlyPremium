import { configureStore } from "@reduxjs/toolkit";
import boatReducer from "./boat/boatSlice";

const store = configureStore({
    reducer: {
        boats: boatReducer,
    }
})

export default store;