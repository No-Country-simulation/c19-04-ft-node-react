import {
    getUser,
    signUp,
    signIn,
    signOut,
    getAllUsers,
} from "../services/auth.service.js";

const AuthController = {
    getUser,
    getAllUsers,
    signUp,
    signIn,
    signOut,
};

export default AuthController;
