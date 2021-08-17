import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../modules/user/user.slice";

const store = configureStore({
    reducer: {
        user: userReducer,
    },
});

export default store;
