const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import routes
const userRoutes = require('./src/api/routes/userRoutes');
const accountRoutes = require('./src/api/routes/accountRoutes');
const transactionRoutes = require('./src/api/routes/transactionRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database Connection
const dbConfig = require('./src/config/dbConfig');
mongoose.connect(dbConfig.url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected…'))
  .catch(err => console.log(err));

// Use Routes
app.use('/api/users', userRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/transactions', transactionRoutes);

// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});