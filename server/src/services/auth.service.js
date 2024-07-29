import jwt from "jsonwebtoken";
import AdminModel from "../models/admin.model.js";
import WaiterModel from "../models/waiter.model.js";
import KitchenModel from "../models/kitchen.model.js";
import logger from "../utils/logger.js";
import TableModel from "../models/table.model.js";
import Hash from "../utils/hash.js";
import { createWaiter } from "./waiter.service.js";

export const signUp = async (req, res) => {
    try {
        const { username, password, name, role } = req.body;
        if (!username || !password || !role) {
            logger.error("Missing required fields");
            return res.status(400).json({ message: "Missing required fields" });
        }
        if (
            (await AdminModel.findOne({ username: username })) ||
            (await KitchenModel.findOne({ username: username })) ||
            (await WaiterModel.findOne({ username: username }))
        ) {
            logger.error("The user that attempt to register already exists");
            return res
                .status(404)
                .json({
                    message: "The user that attempt to register already exists",
                });
        }

        const hashedPassword = await Hash.create(password);

        if (role === "admin") {
            await AdminModel.create({
                username,
                password: hashedPassword,
            });
        } else if (role === "waiter") {
            await WaiterModel.create({
                username,
                password: hashedPassword,
                name,
                role,
            });
            await createWaiter(username);
        } else if (role === "kitchen") {
            await KitchenModel.create({
                username,
                password: hashedPassword,
            });
        }

        logger.info(`User ${username} created successfully`);
        res.status(201).json({
            message: `User ${username} created successfully`,
        });
    } catch (err) {
        logger.error(`Error in signUp: ${err}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const signIn = async (req, res) => {
    const { username, password } = req.body;

    try {
        const userFound =
            (await AdminModel.findOne({ username: username })) ||
            (await WaiterModel.findOne({ username: username })) ||
            (await KitchenModel.findOne({ username: username })) ||
            (await TableModel.findOne({ username: username }));

        if (!userFound) {
            logger.error("User not found");
            return res
                .status(401)
                .json(
                    "The combination of username and password did not match with any of our data"
                );
        }

        const matchPassword = await Hash.compare(password, userFound.password);

        if (!matchPassword) {
            logger.error("Invalid password");
            return res
                .status(401)
                .json(
                    "The combination of username and password did not match with any of our data"
                );
        }

        const payload = {
            id: userFound._id,
            role: userFound.role,
        };

        const token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: process.env.TOKEN_EXPIRATION,
        });

        res.cookie("token", token, {
            httpOnly: true,
            secure: false, //TODO: Cambiar a true en PROD (https)
        });

        logger.info("Logged in successfully");
        res.json({ message: "Logged in successfully" });
    } catch (err) {
        logger.error(`Error in signIn: ${err}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const signOut = async (req, res) => {
    try {
        res.clearCookie("token");

        res.cookie("token", "", {
            httpOnly: true,
            expires: new Date(),
        });

        logger.info("Logged out successfully");
        res.json({ message: "Logged out successfully" });
    } catch (err) {
        logger.error(`Error in signOut: ${err}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getUser = async (req, res) => {
    const { userId } = req;
    try {
        const userPromises = [
            AdminModel.findById({ _id: userId }).exec(),
            KitchenModel.findById({ _id: userId }).exec(),
            WaiterModel.findById({ _id: userId }).exec(),
        ];

        const results = await Promise.allSettled(userPromises);

        const user = results.find(
            (result) => result.status === "fulfilled" && result.value !== null
        ).value;

        logger.info("User fetched successfully.");

        const { username, role } = user;

        res.status(200).json({ username, role });
    } catch (err) {
        logger.error(`Error in signOut: ${err}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getAllUsers = async (req, res) => {
    const { role } = req.body;
    try {
        let userPromises = [];

        if (role === "all") {
            userPromises = [
                AdminModel.find(),
                KitchenModel.find(),
                WaiterModel.find(),
            ];
        } else {
            userPromises = [
                AdminModel.find({ role }),
                KitchenModel.find({ role }),
                WaiterModel.find({ role }),
            ];
        }

        const results = await Promise.allSettled(userPromises);

        const allUsers = results.map((item) => item.value).flat();

        // const user = results.find(
        //     (result) => result.status === "fulfilled" && result.value !== null
        // ).value;

        logger.info("All users data fetched successfully.");

        // const { username, role } = user;

        res.status(200).json(allUsers);
    } catch (err) {
        logger.error(`Error in signOut: ${err}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const deleteUser = async (req, res) => {
    const { userId } = req.params;
    console.log(req.params);

    try {
        const userPromises = [
            AdminModel.findOneAndDelete({ _id: userId }).exec(),
            KitchenModel.findOneAndDelete({ _id: userId }).exec(),
            WaiterModel.findOneAndDelete({ _id: userId }).exec(),
        ];

        const results = await Promise.allSettled(userPromises);
        const fulfilledResult = results.find(
            (result) => result.status === "fulfilled" && result.value !== null
        );

        if (!fulfilledResult) throw new Error("User not found");

        const { username, role } = fulfilledResult.value;

        logger.info("User removed successfully.");

        res.status(200).json({ username, role });
    } catch (err) {
        logger.error(`Error in deleteUser: ${err}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
