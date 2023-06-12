const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');

// Подключение к базе данных MongoDB
mongoose.connect('mongodb://localhost:27017/DaGuide', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));

// Routes
const authRoutes = require('./routes/auth');
const tourRoutes = require('./routes/tour');
const userRoutes = require('./routes/user');
const guideRoutes = require('./routes/guide');
const locationRoutes = require('./routes/location');
const guestHouseRoutes = require('./routes/guesthouse');
const bookingRoutes = require('./routes/booking');

app.use('/api/auth', authRoutes);
app.use('/api/tour', tourRoutes);
app.use('/api/user', userRoutes);
app.use('/api/guide', guideRoutes);
app.use('/api/location', locationRoutes);
app.use('/api/guesthouse', guestHouseRoutes);
app.use('/api/booking', bookingRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Server Error');
});

// Start the server
const port = process.env.PORT || 4444;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
