// dependencies
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoutes = require("./routes/users");

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

// gateway res
app.get(
    "/",
    (req, res) => res.send("Welcome to LabLoco")
);

app.listen(
    port,
    () => console.log(`--> API active on port: ${port}`)
)