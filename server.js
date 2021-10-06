// Require dependencies
const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const PORT = process.env.PORT || 3000;

const seedData = require("./models/productSeed");
const Product = require("./models/product");
// Initialize Express App
const app = express();

// Configure App Settings
require("dotenv").config();
const DATABASE_URL = process.env.DATABASE_URL;

// Connect to MongoDB
mongoose.connect(DATABASE_URL);
const db = mongoose.connection;
db.on("connected", () => console.log("Connected to MongoDB"));
db.on("error", (error) => console.log("MongoDB Error " + error.message));

// Mount Middleware
app.use(morgan("dev"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// routes

app.get("/products/seed", async (req, res) => {
  //   await Product.deleteMany({});
  await Product.create(seedData);
  res.redirect("/products");
});

// Index Route
app.get("/products", (req, res) => {
  //         👇 query object
  Product.find({}, (err, products) => {
    //  Model.find() returns all results in a JS Array
    //                                    👇
    res.render("index.ejs", { products }); // context object
  });
});

// New Route
app.get("/products/new", (req, res) => {
  res.render("new.ejs");
});

// Delete Route
app.delete("/products/:id", (req, res) => {
    Product.findByIdAndDelete(req.params.id, (err, deletedProduct) => {
      res.redirect('/products')
    // res.json({ success: true });
  });
});

// Update Route
app.put("/products/:id", (req, res) => {
  Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedProduct) => {
      // err is a param placeholder that mongoose uses to pass
      // any known errors to this callback function
      console.log(err);
      if (err) {
        res.json({ message: "sorry, something went wrong" });
      } else {
        res.json(updatedProduct);
      }
    }
  );
});

// Create Route
app.post("/products", (req, res) => {
  req.body.completed = !!req.body.completed; // !!'on' -> true or !!undefined -> false
  Product.create(req.body, (err, product) => {
    res.redirect("/products"); // tells the browser to make another GET request to /books
  });
});


// Edit Route
app.get("/products/:id/edit", (req, res) => {
  Product.findById(req.params.id, (err, product) => {
    res.render("edit.ejs", { product });
  });
});
// Show Route
app.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.render("show.ejs", { product });
  } catch (error) {
    console.log(error.message);
    res.render("show.ejs");
  }
});

// Tell the App to listen for requests

app.listen(PORT, () => {
  console.log(`Express is listening on port:${PORT}`);
});
