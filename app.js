const express = require('express');
const app = express();
//put here.
const port = process.env.PORT || 4000;

// Import Routes
const menuRoutes = require('./routes/menuRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const orderRoutes = require('./routes/orderRoutes');



// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS handling (Adjust as per your requirements)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

// Routes
app.use('/menu', menuRoutes);
app.use('/category', categoryRoutes);
app.use('/booking', bookingRoutes);
app.use('/order', orderRoutes);

// Handle Non-Existent Routes
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

// Error Handling
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
