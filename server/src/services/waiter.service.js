import WaiterModel from "../models/waiter.model.js";
import logger from "../utils/logger.js";

export const sendMessage = async (req, res) => {
    const tableNumber = req.params.tableNumber;

    if (!tableNumber) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        const waiter = await WaiterModel.findOne({
            tablesAssigned: Number.parseInt(tableNumber),
        });

        const isAlreadyRequested = waiter.requestedBy.filter(
            (element) => element.tableNumber === Number.parseInt(tableNumber)
        );
        if (isAlreadyRequested.length > 0) {
            return res.status(403).json({
                message: `The table number ${tableNumber} already request a waiter`,
            });
        }
        waiter.requestedBy.push({
            tableNumber: Number.parseInt(tableNumber),
            message: `The table number ${tableNumber} request assistance`,
            waiterUser: waiter.username,
        });
        await WaiterModel.findByIdAndUpdate({ _id: waiter._id }, waiter, {
            new: true,
        });

        logger.info("The waiter has been requested");
        res.status(200).json({
            tableNumber,
            message: `The table number ${tableNumber} request assistance`,
            waiterUser: waiter.username,
        });
    } catch (err) {
        logger.error(
            `Error requesting waiter: ${err}, Request Data: ${JSON.stringify(
                err
            )}`
        );
        res.status(500).json({ error: "Error requesting waiter" });
    }
};

export const assignTables = async (req, res) => {
    try {
        const { waiterUsername } = req.params;
        const { tables } = req.body;

        const waiter = await WaiterModel.findOne({ username: waiterUsername });

        waiter.tablesAssigned = tables;

        await WaiterModel.findByIdAndUpdate({ _id: waiter._id }, waiter, {
            new: true,
        });

        logger.info("Waiter updated correctly");
        res.status(200).json({ message: "Tables assigned correctly" });
    } catch (err) {
        logger.error(`Something unexpected happend at ${err}`);
        res.status(500).json({ message: "Server Internal Error" });
    }
};

export const getRequestedTables = async (req, res) => {
    try {
        const waiterUsername = req.params.waiterUsername;
        const waiter = await WaiterModel.findOne({ username: waiterUsername });
        res.status(200).json(waiter.requestedBy);
    } catch (err) {
        logger.error(`Something unexpected happend at ${err}`);
        res.status(500).json({ message: "Server Internal Error" });
    }
};

export const deleteRequestTable = async (req, res) => {
    try {
        const tableNumber = req.params.tableNumber;
        const waiter = await WaiterModel.findOne({
            tablesAssigned: Number.parseInt(tableNumber),
        });
        const array = waiter.requestedBy;
        const elementIndex = array
            .map(
                (element) =>
                    element.tableNumber === Number.parseInt(tableNumber)
            )
            .indexOf(true);
        if (elementIndex === -1)
            return res.status(403).json({
                message: `The table number ${tableNumber} doesn't made a request to the waiter.`,
            });

        array.splice(elementIndex, 1);
        await WaiterModel.findByIdAndUpdate({ _id: waiter._id }, waiter, {
            new: true,
        });
        return res.status(200).json({
            message: `Request for waiter ${waiter.username} already done.`,
        });
    } catch (err) {
        logger.error(`Something unexpected happend at ${err}`);
        res.status(500).json({ message: "Server Internal Error" });
    }
};

export const getWaiters = async (req, res) => {
    try {
        const response = await WaiterModel.find();
        const waiters = response.map((item) => ({
            username: item.username,
            id: item._id.toString(),
            tablesAssigned: item.tablesAssigned,
            requestedBy: item.requestedBy,
        }));
        res.status(200).json(waiters);
        // res.status(200).json(waiters.requestedBy);
    } catch (err) {
        logger.error(`Something unexpected happend at ${err}`);
        res.status(500).json({ message: "Server Internal Error" });
    }
};
