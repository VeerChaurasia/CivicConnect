const dotenv = require('dotenv');
dotenv.config(); // Load environment variables FIRST

const express = require('express');
const cors = require('cors');
const createEventRoute = require('./api/create-event.js');
const checkinRoute = require('./api/checkin.js'); // Fixed: import the correct file

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Routes
app.use('/api', createEventRoute);
app.use('/api/checkin', checkinRoute); // This will handle POST /api/checkin

app.get('/', (req, res) => {
  res.send('Event Badge API is running.');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});