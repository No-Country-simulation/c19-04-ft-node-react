import { registerUser } from "./actionsUser/registerAction";
import { deleteUser } from "./actionsUser/deleteAction";
import { logoutUser } from "./actionsUser/logoutAction";
import { updateUser } from "./actionsUser/updateAction";
import { loginAction } from "./actionsUser/loginAction";
import { fetchUser } from "./actionsUser/fetchUser";
import {
    handlePending,
    handleFulfilled,
    handleRejected,
} from "../../../../utils/functions/sliceHelpers";

export const asyncHandlers = {
    [registerUser.pending]: handlePending,
    [registerUser.fulfilled]: handleFulfilled,
    [registerUser.rejected]: handleRejected,
    [deleteUser.pending]: handlePending,
    [deleteUser.fulfilled]: handleFulfilled,
    [deleteUser.rejected]: handleRejected,
    [logoutUser.pending]: handlePending,
    [logoutUser.fulfilled]: handleFulfilled,
    [logoutUser.rejected]: handleRejected,
    [updateUser.pending]: handlePending,
    [updateUser.fulfilled]: handleFulfilled,
    [updateUser.rejected]: handleRejected,
    [loginAction.pending]: handlePending,
    [loginAction.fulfilled]: handleFulfilled,
    [loginAction.rejected]: handleRejected,
    [fetchUser.pending]: handlePending,
    [fetchUser.fulfilled]: handleFulfilled,
    [fetchUser.rejected]: handleRejected,
};
