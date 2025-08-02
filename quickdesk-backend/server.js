const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 🚀 Import routes
const ticketRoutes = require('./routes/tickets');
const authRoutes = require('./routes/auth'); // we’ll add this later

// 💡 Mount routes
app.use('/tickets', ticketRoutes);
app.use('/auth', authRoutes); // optional for now

// Basic test route
app.get('/', (req, res) => {
  res.send('QuickDesk API is working ✅');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection failed:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
