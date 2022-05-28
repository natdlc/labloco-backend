// dependencies
const express = require("express");
const Grid = require("gridfs-stream");
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

let gfs, gridfsBucket;

// server
const app = express();
app.use(express.json());

// db connection
mongoose.connect(acct);
let conn = mongoose.connection;
conn.once("open", async () => {
	gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
		bucketName: "productPhotos",
	});

	gfs = Grid(conn.db, mongoose.mongo);
	gfs.collection("productPhotos");
	console.log(`--> Connected to MongoDB`);
});


// routes
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/discounts", discountRoutes);

// *EXTRA* Retrieve product image
app.get("/products/image/:filename", async (req, res) => {
	try {
    const file = await gfs.files.findOne({ filename: req.params.filename });
		const readStream = gridfsBucket.openDownloadStream(file._id);
		readStream.pipe(res);
  } catch (error) {
    console.log(error);
		res.send("not found");
	}
});

// *EXTRA* Delete product image (admin only)
app.delete("/products/image/:filename", async (req, res) => {
	try {
		await gfs.files.deleteOne({ filename: req.params.filename });
		res.send("success");
	} catch (error) {
		res.send("An error occured.");
	}
});

// gateway res
app.get("/", (req, res) => res.send("Welcome to LabLoco"));

app.listen(port, () => console.log(`--> API active on port: ${port}`));
