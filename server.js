const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

console.log("MONGO_URI from .env:", process.env.MONGO_URI); // Debugging output

if (!process.env.MONGO_URI) {
    console.error("❌ ERROR: MONGO_URI is missing from .env");
    process.exit(1); // Stop server if missing
}


const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));


// User Schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String
});
const User = mongoose.model('User', UserSchema);

// Item Schema
const ItemSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String,
  price: Number,
  imageUrl: String,
});
const Item = mongoose.model('Item', ItemSchema);

// Register User
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ error: 'User already exists' });
  }
});

// Login User
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token, userId: user._id });
});

// Upload Item
app.post('/upload', async (req, res) => {
  const { name, description, category, price, imageUrl } = req.body;
  const item = new Item({ name, description, category, price, imageUrl });
  await item.save();
  res.status(201).json({ message: 'Item uploaded successfully' });
});

// Get All Items
app.get('/items', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// Start Server
const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


