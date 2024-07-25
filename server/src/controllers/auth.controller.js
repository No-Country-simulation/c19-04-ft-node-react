import { getUser, signUp, signIn, signOut } from "../services/auth.service.js";

const AuthController = {
    getUser,
    signUp,
    signIn,
    signOut,
};

export default AuthController;
