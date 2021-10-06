
const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const PORT = process.env.PORT || 3000;

const seedData = require("./models/productSeed");
const Product = require("./models/product");

const app = express();

require("dotenv").config();
const DATABASE_URL = process.env.DATABASE_URL;

mongoose.connect(DATABASE_URL);
const db = mongoose.connection;
db.on("connected", () => console.log("Connected to MongoDB"));
db.on("error", (error) => console.log("MongoDB Error " + error.message));

app.use(morgan("dev"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.get("/products/seed", async (req, res) => {
  await Product.create(seedData);
  res.redirect("/products");
});

app.get("/products", (req, res) => {
  Product.find({}, (err, products) => {                                    
    res.render("index.ejs", { products }); 
  });
});

app.get("/products/new", (req, res) => {
  res.render("new.ejs");
});

app.delete("/products/:id", (req, res) => {
    Product.findByIdAndDelete(req.params.id, (err, deletedProduct) => {
      res.redirect('/products')
  });
});

app.put("/products/:id", (req, res) => {
  Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedProduct) => {
      console.log(err);
      if (err) {
        res.json({ message: "sorry, something went wrong" });
      } else {
        res.redirect('/products');
      }
    }
  );
});

app.post("/products", (req, res) => {
  req.body.completed = !!req.body.completed; 
  Product.create(req.body, (err, product) => {
    res.redirect("/products"); 
  });
});

app.get("/products/:id/edit", (req, res) => {
  Product.findById(req.params.id, (err, product) => {
    res.render("edit.ejs", { product });
  });
});

app.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.render("show.ejs", { product });
  } catch (error) {
    console.log(error.message);
    res.render("show.ejs");
  }
});

app.listen(PORT, () => {
  console.log(`Express is listening on port:${PORT}`);
});
