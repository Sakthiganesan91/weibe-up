import express from "express";
const router = express.Router();
const Address = require("../models/order.model");
const Order = require("../models/order.model");
// Create a new order
router.post("/api/orders", async (req, res) => {
  const { frontDesign, backDesign, size, quantity, color, orderId, user } =
    req.body;

  if (!size || !frontDesign || !quantity || !color) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  try {
    // Create a new order
    const order = new Order({
      userId: user,
      frontDesign,
      backDesign,
      size,
      quantity,
      color,
      orderId,
    });

    // Save to database
    const savedOrder = await order.save();
    res
      .status(201)
      .json({ message: "Order placed successfully", order: savedOrder });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ error: "Failed to place order" });
  }
});

// Get all orders for an admin view
router.get("/orders", async (req, res) => {
  try {
    // Fetch all orders
    const orders = await Order.find().populate("user", "name email");
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// Get orders by user ID for individual users
router.get("/api/orders/user/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await Order.find({ user: userId }).populate(
      "user",
      "name email"
    );
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

export default router;
