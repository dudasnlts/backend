import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  image: { type: String }
}, { timestamps: true });

// Garanta que o export default está exatamente assim:
const Product = mongoose.model("Product", ProductSchema);
export default Product;