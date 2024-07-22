import jwt from "jsonwebtoken";
import AdminModel from "../models/admin.model.js";
import KitchenModel from "../models/kitchen.model.js";
import WaiterModel from "../models/waiter.model.js";
import logger from "../utils/logger.js";

const VerifyToken = async (req, res, next) => {
    const token = req.cookies.token;

    try {
        if (!token) return res.status(401).json({ msg: "No token provided" });

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const userId = decoded.id;
        const userRole = decoded.role;

        const userPromises = [
            AdminModel.findById({ _id: userId }).exec(),
            KitchenModel.findById({ _id: userId }).exec(),
            WaiterModel.findById({ _id: userId }).exec(),
        ];

        const results = await Promise.allSettled(userPromises);

        const userIsValid = results.some(
            (result) => result.status === "fulfilled" && result.value !== null
        );

        if (!userIsValid)
            return res.status(404).json({ msg: "User not found in any model" });

        req.userRole = userRole;
        req.userId = userId;
        next();
    } catch (err) {
        logger.error(`Error in VerifyToken: ${err}`);

        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ msg: "Token expired" });
        }

        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

export default VerifyToken;
