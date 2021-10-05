// Require dependencies
const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const PORT = process.env.PORT || 3000
// Initialize Express App
const app = express()


// Configure App Settings
require('dotenv').config()
const DATABASE_URL = process.env.DATABASE_URL


// Connect to MongoDB
mongoose.connect(DATABASE_URL)
const db = mongoose.connection

db.on("connected", () => console.log("Connected to MongoDB"));
db.on("error", (error) => console.log("MongoDB Error " + error.message));
// Mount Middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.static("public"));


//seed route



// INDUCES CRUD
// Mount Routes
// Routes / Controllers
// Index
app.get('/products', (req, res) => {
res.send('hey')
})

// New


// Create Route


// Show ///NEW WAY TO WRITE


// Tell the App to listen for requests

app.listen(PORT, () => {
  console.log(`Express is listening on port:${PORT}`);
});
