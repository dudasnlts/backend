import { Request, Response } from "express";
import Order from "../../models/Order";

export const getOrders = async (req: any, res: Response) => {
  try {
    // 🔐 Validação de autenticação
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Não autorizado"
      });
    }

    const userId = req.user.id;

    // 📄 Paginação
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    // 📦 Busca pedidos
    const orders = await Order.find({ user: userId })
      .populate({
        path: "items.product",
        select: "name price image"
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // 📊 Total de pedidos (para paginação frontend)
    const totalOrders = await Order.countDocuments({ user: userId });

    // 📊 Total de páginas
    const totalPages = Math.ceil(totalOrders / limit);

    // ✅ Resposta padronizada
    return res.status(200).json({
      success: true,
      data: {
        orders,
        pagination: {
          currentPage: page,
          totalPages,
          totalOrders,
          limit
        }
      }
    });

  } catch (error: any) {
    console.error("Erro ao buscar pedidos:", error);

    return res.status(500).json({
      success: false,
      message: "Erro ao buscar pedidos",
      error: error.message
    });
  }
};