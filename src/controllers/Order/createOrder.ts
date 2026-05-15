import { Request, Response } from "express";
import Order from "../../models/Order";
import Cart from "../../models/Cart";

export const createOrder = async (
  req: any,
  res: Response
) => {

  try {

    // USER
    if (!req.user || !req.user.id) {

      return res.status(401).json({
        success: false,
        message: "Não autorizado"
      });

    }

    const userId = req.user.id;

    const {
      shipping = 0,
      discount = 0,
      address = ""
    } = req.body;

    // BUSCA CARRINHO
    const cart = await Cart.findOne({
      user: userId
    }).populate("items.product");

    let items: any[] = [];

    let subtotal = 0;

    /*
    |--------------------------------------------------------------------------
    | USA ITENS DO CARRINHO
    |--------------------------------------------------------------------------
    */

    if (cart && cart.items.length > 0) {

      items = cart.items
        .filter((item: any) => item.product)
        .map((item: any) => ({

          product: item.product._id,

          name: item.product.name,

          price: item.product.price,

          quantity: item.quantity,

          image: item.product.image || ""

        }));

      subtotal = items.reduce(
        (acc, item) =>
          acc + item.price * item.quantity,
        0
      );

      /*
      |--------------------------------------------------------------------------
      | APAGA O CARRINHO COMPLETAMENTE
      |--------------------------------------------------------------------------
      */

      await Cart.findOneAndDelete({
        user: userId
      });

    }

    /*
    |--------------------------------------------------------------------------
    | FALLBACK FRONTEND
    |--------------------------------------------------------------------------
    */

    else if (
      req.body.items &&
      Array.isArray(req.body.items) &&
      req.body.items.length > 0
    ) {

      items = req.body.items.map(
        (item: any) => ({

          product:
            item._id ||
            item.product ||
            item.productId,

          name: item.name,

          price: item.price,

          quantity:
            item.quantity || 1,

          image:
            item.image || ""

        })
      );

      subtotal =
        req.body.subtotal ||

        items.reduce(
          (
            acc: number,
            item: any
          ) =>
            acc +
            (item.price || 0) *
            (item.quantity || 1),

          0
        );

    }

    /*
    |--------------------------------------------------------------------------
    | CARRINHO VAZIO
    |--------------------------------------------------------------------------
    */

    else {

      return res.status(400).json({
        success: false,
        message: "Carrinho vazio"
      });

    }

    /*
    |--------------------------------------------------------------------------
    | NENHUM ITEM
    |--------------------------------------------------------------------------
    */

    if (items.length === 0) {

      return res.status(400).json({
        success: false,
        message: "Nenhum item válido"
      });

    }

    /*
    |--------------------------------------------------------------------------
    | TOTAL
    |--------------------------------------------------------------------------
    */

    const total = Math.max(
      subtotal +
      Number(shipping) -
      Number(discount),
      0
    );

    /*
    |--------------------------------------------------------------------------
    | CRIA PEDIDO
    |--------------------------------------------------------------------------
    */

    const order = await Order.create({

      user: userId,

      items,

      subtotal,

      shipping: Number(shipping),

      discount: Number(discount),

      total,

      address,

      status: "pending"

    });

    /*
    |--------------------------------------------------------------------------
    | RESPONSE
    |--------------------------------------------------------------------------
    */

    return res.status(201).json({

      success: true,

      message: "Pedido criado com sucesso",

      order

    });

  } catch (error: any) {

    console.error(
      "Erro ao criar pedido:",
      error
    );

    return res.status(500).json({

      success: false,

      message: "Erro ao criar pedido",

      error: error.message

    });

  }

};