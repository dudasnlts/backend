import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  descricao: { type: String }
}, { timestamps: true });

// Garanta que o export default está exatamente assim:
const Categorys = mongoose.model("Categorys", CategorySchema);
export default Categorys;