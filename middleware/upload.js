const multer = require("multer");
const {GridFsStorage} = require("multer-gridfs-storage");

const storage = new GridFsStorage({
	url: process.env.DBCRED,
	file: (req, file) => {
		const match = ["image/png", "image/jpeg"];

		if (match.indexOf(file.mimetype) === -1) {
			const filename = `${Date.now()}-product-image-${file.originalname}`;
			return filename;
		}

		return {
			bucketName: "productPhotos",
			filename: `${Date.now()}-product-image-${file.originalname}`,
		};
	},
});

module.exports = multer({ storage });
