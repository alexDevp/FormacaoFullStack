import { Request, Response, NextFunction } from "express";
import Product from "../models/product";

const readProduct = async (req: Request, res: Response, next: NextFunction) => {
  const productId = req.params.productId;

  return Product.findById(productId)
    .then((product) =>
      product
        ? res.status(201).json({ product })
        : res.status(204).json({ message: "Not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

const readAllProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return Product.find()
    .then((products) => res.status(201).json({ products }))
    .catch((error) => res.status(500).json({ error }));
};

const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, price, unQ, tax, active } = req.body;

  const newProduct = new Product({
    name,
    price,
    unQ,
    tax,
    active: true,
  });

  return newProduct
    .save()
    .then((product) => res.status(201).json({ product }))
    .catch((error) => res.status(500).json({ error }));
};

const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const productId = req.params.productId;

  return Product.findById(productId)
    .then((product) => {
      if (product) {
        product.set(req.body);

        return product
          .save()
          .then((product) => res.status(201).json({ product }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        res.status(204).json({ message: "Not found" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const productId = req.params.productId;

  return Product.findById(productId)
    .then((product) => {
      if (product) {
        product.active = false;
        return product
          .save()
          .then((product) => res.status(201).json({ product }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        res.status(204).json({ message: "Not found" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

export default {
  readAllProduct,
  readProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
