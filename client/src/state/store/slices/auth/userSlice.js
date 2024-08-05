import { createSlice } from "@reduxjs/toolkit";
import { asyncHandlers } from "./asyncHandlers";

import { registerUser } from "./actionsUser/registerAction";
import { deleteUser } from "./actionsUser/deleteAction";
import { loginAction } from "./actionsUser/loginAction";
import { logoutUser } from "./actionsUser/logoutAction";
import { updateUser } from "./actionsUser/updateAction";
import { fetchUser } from "./actionsUser/fetchUser";

export const userAuthSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: { username: "", role: "" },
        allUsers: [],
        status: "idle",
        error: null,
    },
    reducers: {
        logoutCleanState: (state) => {
            state.currentUser.username = '',
            state.currentUser.role = ''
        }
    },
    extraReducers: (builder) => {
        Object.keys(asyncHandlers).forEach((actionType) => {
            builder.addCase(actionType, (state, action) => {
                if (
                    actionType === registerUser.pending ||
                    actionType === loginAction.pending ||
                    actionType === logoutUser.pending ||
                    actionType === deleteUser.pending ||
                    actionType === updateUser.pending ||
                    actionType === fetchUser.pending
                ) {
                    asyncHandlers[actionType](state);
                } else {
                    asyncHandlers[actionType](state, action);
                }
            });
        });
    },
});

export const {logoutCleanState} = userAuthSlice.actions

export default userAuthSlice.reducer;
