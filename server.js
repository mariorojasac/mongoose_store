// Require dependencies
const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const PORT = process.env.PORT
// Initialize Express App
const app = express()


// Configure App Settings
require('dotenv').config()
const DATABASE_URL = process.env.DATABASE_URL


// Connect to MongoDB
mongoose.connect(DATABASE_URL)
const db = mongoose.connection
// Mount Middleware
app.use(express.urlencoded({ extended: false }))


//seed route



// INDUCES CRUD
// Mount Routes
// Routes / Controllers
// Index
app.get('/', (req, res) => {

})

// New


// Create Route


// Show ///NEW WAY TO WRITE


// Tell the App to listen for requests

app.listen(PORT, () => {
  console.log(`Express is listening on port:${PORT}`);
});
