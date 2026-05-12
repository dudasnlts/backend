import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  description: {
    type: String,
    default: ""
  },

  price: {
    type: Number,
    required: true
  },

  stock: {
    type: Number,
    default: 0
  },

  image: {
    type: String,
    default: ""
  },

  images: [{
    type: String
  }],

  sale: {
    type: Boolean,
    default: false
  },

  salePrice: {
    type: Number,
    default: 0
  },

  featured: {
    type: Boolean,
    default: false
  },

  // CATEGORY RELATION

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  }

},
{
  timestamps: true
});

const Product = mongoose.model(
  "Product",
  ProductSchema
);

export default Product;