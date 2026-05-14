import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
  image: { type: String }
});

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    items: [OrderItemSchema],

    subtotal: { type: Number, required: true, default: 0 },
    shipping: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    total: { type: Number, required: true },

    address: { type: String, default: "" },

    status: {
      type: String,
      enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
      default: "pending"
    }
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

export default Order;
