import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  image: { type: String },

  //  RELACIONAMENTO COM CATEGORY
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  }

}, { timestamps: true });

const Product = mongoose.model("Product", ProductSchema);

export default Product;