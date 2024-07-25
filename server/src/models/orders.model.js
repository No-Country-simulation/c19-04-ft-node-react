import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  tableNumber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Table",
  },
  orderedDishes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Menu",
  },
});

const OrderModel = mongoose.model("Order", orderSchema);

export default OrderModel;
