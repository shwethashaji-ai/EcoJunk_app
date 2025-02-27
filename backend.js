const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/ecojunk")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
const User = mongoose.model("User", userSchema);

const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
});
const Item = mongoose.model("Item", itemSchema);

const cartSchema = new mongoose.Schema({
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
  total: Number,
});
const Cart = mongoose.model("Cart", cartSchema);

// Register User
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to register user" });
  }
});

// Upload Item
app.post("/items", async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.json({ message: "Item uploaded successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to upload item" });
  }
});

// Fetch Items
app.get("/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

// Add to Cart
app.post("/cart", async (req, res) => {
  try {
    const { itemId } = req.body;
    const item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ error: "Item not found" });
    let cart = await Cart.findOne();
    if (!cart) cart = new Cart({ items: [], total: 0 });
    cart.items.push(item);
    cart.total += item.price;
    await cart.save();
    res.json({ message: "Item added to cart" });
  } catch (err) {
    res.status(500).json({ error: "Failed to add item to cart" });
  }
});

// Fetch Cart
app.get("/cart", async (req, res) => {
  try {
    const cart = await Cart.findOne().populate("items");
    res.json(cart || { items: [], total: 0 });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch cart" });
  }
});

// Payment Processing (Dummy Endpoint)
app.post("/payment", async (req, res) => {
  try {
    res.json({ message: "Payment successful" });
  } catch (err) {
    res.status(500).json({ error: "Payment failed" });
  }
});

const PORT = 5004;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

