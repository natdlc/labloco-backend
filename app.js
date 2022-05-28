// dependencies
const express = require("express");
const Grid = require("gridfs-stream");
const mongoose = require("mongoose");
require("dotenv").config();

const auth = require("./auth");
const { verify, verifyAdmin } = auth;

const Product = require("./models/Product");

// routes dependencies
const userRoutes = require("./routes/users");
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");
const discountRoutes = require("./routes/discounts");
const categoryRoutes = require("./routes/categories");

// env
const port = process.env.PORT;
const acct = process.env.DBCRED;

// for image handling
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
app.use("/categories", categoryRoutes);

// *EXTRA* Retrieve product image
app.get("/products/image/:productId", async (req, res) => {
	try {
		const filename = await Product.findById(req.params.productId)
			.then((product) => {
				return product.image[0].filename;
			})
			.catch((err) => res.send(err.message));
		const file = await gfs.files.findOne({ filename });
		const readStream = gridfsBucket.openDownloadStream(file._id);
		readStream.pipe(res);
	} catch (error) {
		res.send("not found");
	}
});

// *EXTRA* Delete product image (admin only)
app.delete(
	"/products/image/:productId",
	verify,
	verifyAdmin,
	async (req, res) => {
		try {
			const image = await Product.findById(req.params.productId)
				.then(async (product) => {
					await Product.findByIdAndUpdate(req.params.productId, {
						$pull: {
							image: {
								imageId: product.image[0].imageId,
							},
						},
					})
						.then()
						.catch((err) => res.send(err.message));
					return product.image[0];
				})
				.catch((err) => res.send(err.message));

			await gfs.files.deleteOne({ filename: image.filename });

			res.send("success");
		} catch (error) {
			res.send("An error occured.");
		}
	}
);

// gateway res
app.get("/", (req, res) => res.send("Welcome to LabLoco"));

app.listen(port, () => console.log(`--> API active on port: ${port}`));
