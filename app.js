// dependencies
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

// routes dependencies
const userRoutes = require("./routes/users");
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders")

// env
const port = process.env.PORT;
const acct = process.env.DBCRED;

// server
const app = express();
app.use(express.json());

// db connection
mongoose.connect(acct);
let db = mongoose.connection;
db.once(
    "open",
    () => console.log(`--> Connected to MongoDB`)
);

// routes
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

// gateway res
app.get(
    "/",
    (req, res) => res.send("Welcome to LabLoco")
);

app.listen(
    port,
    () => console.log(`--> API active on port: ${port}`)
)

/* Minimum requirements (ZUITT)

● (complete) User registration 
● (complete) User authentication
● (complete) Create Product (Admin only)
● (complete) Retrieve all active products
● (complete) Retrieve single product
● (complete) Update Product information (Admin only)
● (complete) Archive Product (Admin only)
● (complete) Non-admin User checkout (Create Order)

● (complete) Set user as admin (Admin only)
● (complete) Retrieve authenticated user’s orders
● Retrieve all orders (Admin only)

*/