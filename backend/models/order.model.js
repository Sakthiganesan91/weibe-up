const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    frontDesign: {
      type: String,
      required: [true, "frontDesign is required"],
      trim: true,
    },
    backDesign: {
      type: String,

      trim: true,
    },
    orderId: {
      type: String,
    },
    size: { type: String, trim: true },

    color: { type: String, required: [true, "Color is required"], trim: true },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      trim: true,
    },

    userId: {
      type: String,
      required: [true, "User ID is required"],
    },
  },
  {
    timestamps: true,
  }
);

const orderModel = mongoose.model("order", orderSchema);

module.exports = orderModel;
