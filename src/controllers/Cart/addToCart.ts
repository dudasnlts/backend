import { Request, Response } from "express";
import Cart from "../../models/Cart";

export const addToCart = async (req: any, res: Response) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    let cart = await Cart.findOne({ user: userId });

    // 🟢 se não existir cart, cria
    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: []
      });
    }

    // 🔥 sempre adiciona assim (seguro)
    cart.items.push({
      product: productId,
      quantity: quantity || 1
    });

    await cart.save();

    // 🔥 retorna já populado
    const updatedCart = await Cart.findOne({ user: userId })
      .populate("items.product");

    res.json(updatedCart);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};