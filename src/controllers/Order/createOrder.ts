import { Request, Response } from "express";
import Order from "../../models/Order";
import Cart from "../../models/Cart";

export const createOrder = async (req: any, res: Response) => {
  try {
    // 🔐 valida usuário
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Não autorizado"
      });
    }

    const userId = req.user.id;
    const { shipping = 0, discount = 0, address } = req.body;

    // 📦 busca carrinho
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Carrinho vazio"
      });
    }

    // 💰 subtotal
    const subtotal = cart.items.reduce((acc: number, item: any) => {
      if (!item.product) return acc; // segurança
      return acc + item.product.price * item.quantity;
    }, 0);

    // 🧾 itens no formato CORRETO
    const items = cart.items.map((item: any) => ({
      product: item.product._id, // 🔥 CORRIGIDO
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      image: item.product.image
    }));

    // 💰 total final protegido
    const total = Math.max(subtotal + shipping - discount, 0);

    // 📦 cria pedido
    const order = await Order.create({
      user: userId,
      items,
      subtotal,
      shipping,
      discount,
      total,
      address,
      status: "pending"
    });

    // 🧹 limpa carrinho
    cart.items = [] as any
    await cart.save();

    return res.status(201).json({
      success: true,
      order
    });

  } catch (error: any) {
    console.error("Erro ao criar pedido:", error);

    return res.status(500).json({
      success: false,
      message: "Erro ao criar pedido",
      error: error.message
    });
  }
};