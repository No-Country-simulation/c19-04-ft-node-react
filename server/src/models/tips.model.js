import mongoose from "mongoose";

const tipsSchema = new mongoose.Schema({
  amount: {
    type: Number,
  },
});

const TipsModel = mongoose.model("Tips", tipsSchema);

export default TipsModel;
