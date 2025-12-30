import mongoose from "mongoose";

const shopkeeperSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    shopName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    aadharNumber: {
      type: String,
      required: true,
      unique: true,
    },
      ownerImage:{
      type:String,
      default:"",
    },
    shopImage:{
      type:String,
      default:""},
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

const Shopkeeper = mongoose.model("Shopkeeper", shopkeeperSchema);

export default Shopkeeper;
