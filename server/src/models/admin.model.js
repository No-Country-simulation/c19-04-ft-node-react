import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  brandName: {
    type: String,
    required: true,
  },
  brandLogo: {
    type: String,
    required: true,
  },
  brandColor: {
    type: String,
    required: false,
    default: "#FF5E5B",
  },
  subscription: {
    type: String,
    required: true,
    enum: ["free", "basic", "premium"],
    default: "free",
  },
  role: {
    type: String,
    default: "admin",
  },
});

const AdminModel = mongoose.model("Admin", adminSchema);

export default AdminModel;
