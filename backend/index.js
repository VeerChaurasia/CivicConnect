const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const createEventRoute = require('./api/create-event.js');
const checkinRoute = require('./api/checkin.js');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration
const corsOptions = {
  origin: 'https://civic-connect-seven.vercel.app/',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));

// Routes
app.use('/api', createEventRoute);
app.use('/api/checkin', checkinRoute);

app.get('/', (req, res) => {
  res.send('Event Badge API is running.');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
