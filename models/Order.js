const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
<<<<<<< HEAD
  userId: {
    type: String,
    required: [true, "User ID is required"],
  },
  totalAmount: {
    type: Number,
    default: 0,
  },
  purchasedOn: {
    type: Date,
    default: new Date(),
  },
  comments: {
    type: String,
    default: "",
  },
  paymentMethod: {
    type: String,
    required: [true, "A payment method is required"],
  },
  courier: [
    {
      courierId: {
        type: String,
        required: [true, "A courier is required"],
      },
    },
  ],
  discount: [
    {
      discountId: {
        type: String,
        required: [true, "Discount id is required"],
      },
      percentage: {
        type: Number,
        default: 0,
      },
      amount: {
        type: Number,
        required: [true, "Discount amount is required"],
      },
    },
  ],
  products: [
    {
      productId: {
        type: String,
        required: [true, "Product ID is required"],
      },
      quantity: {
        type: Number,
        required: [true, "Product quantity is required"],
      },
    },
  ],
=======
	userId: {
		type: String,
		required: [true, "User ID is required"],
	},
	totalAmount: {
		type: Number,
		default: 0,
	},
	purchasedOn: {
		type: Date,
		default: new Date(),
	},
	status: {
		type: String,
		default: "new",
	},
	comments: {
		type: String,
		default: "",
	},
	courier: [
		{
			courierId: {
				type: String,
				required: [true, "A courier is required"],
			},
		},
	],
	discount: [
		{
			discountId: {
				type: String,
				required: [true, "Discount id is required"],
			},
			percentage: {
				type: Number,
				default: 0,
			},
			amount: {
				type: Number,
				required: [true, "Discount amount is required"],
			},
		},
	],
	products: [
		{
			productId: {
				type: String,
				required: [true, "Product ID is required"],
			},
			quantity: {
				type: Number,
				required: [true, "Product quantity is required"],
			},
		},
	],
>>>>>>> dca55368c0f9b8d8424313051fc108b8f9bf9997
});

module.exports = new mongoose.model("Order", orderSchema);
