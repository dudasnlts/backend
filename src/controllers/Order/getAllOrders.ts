import { Request, Response } from "express";
import Order from "../../models/Order";

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const orders = await Order.find()
      .populate({ path: "user", select: "name email" })
      .populate({ path: "items.product", select: "name price image" })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Order.countDocuments();

    return res.status(200).json({
      success: true,
      data: {
        orders,
        pagination: { currentPage: page, totalPages: Math.ceil(total / limit), total, limit }
      }
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};