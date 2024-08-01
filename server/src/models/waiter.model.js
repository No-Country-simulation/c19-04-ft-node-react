import mongoose from "mongoose";

const waiterSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        default: "waiter",
    },
});

const WaiterModel = mongoose.model("Waiter", waiterSchema);

export default WaiterModel;
