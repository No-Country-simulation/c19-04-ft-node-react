import {
    deleteUser,
    getUser,
    signUp,
    signIn,
    signOut,
    getAllUsers,
} from "../services/auth.service.js";

const AuthController = {
    deleteUser,
    getUser,
    getAllUsers,
    signUp,
    signIn,
    signOut,
};

export default AuthController;
