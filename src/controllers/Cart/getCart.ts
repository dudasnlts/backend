import { Response } from "express";
import Cart from "../../models/Cart";

export const getCart = async (req: any, res: Response) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate("items.product");
    res.json(cart || { items: [] });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};