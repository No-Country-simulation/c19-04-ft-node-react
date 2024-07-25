import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const StockModel = mongoose.model("Stock", stockSchema);

export default StockModel;
