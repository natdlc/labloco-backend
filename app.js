// dependencies
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

// routes dependencies
const userRoutes = require("./routes/users");
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");
const discountRoutes = require("./routes/discounts");

// env
const port = process.env.PORT;
const acct = process.env.DBCRED;

// server
const app = express();
app.use(express.json());

// db connection
mongoose.connect(acct);
let db = mongoose.connection;
db.once("open", () => console.log(`--> Connected to MongoDB`));

// routes
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/discounts", discountRoutes);

// gateway res
app.get("/", (req, res) => res.send("Welcome to LabLoco"));

app.listen(port, () => console.log(`--> API active on port: ${port}`));

