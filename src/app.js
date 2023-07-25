require('dotenv').config();

const cors = require('cors');
const express = require('express');
const app = express();
const port = process.env.PORT
const path = require('path');
const bodyParser = require('body-parser');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//allow request
app.use(cors({ origin: '*' }));

// Serve the images from the 'src/Uploads' folder
app.use('/uploads', express.static(path.join(__dirname, './Uploads')));

// MongoDB connection
const connectDB = require('./Config/db');

try {
  connectDB(); 

  // Routes
  const productRoutes = require('./Routes/ProductRoutes');
  app.use('/products', productRoutes); 
  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
} catch (error) {
  console.error('App setup error:', error.message);
  process.exit(1);
}

