import express from "express";
import controller from "../controllers/product";
const _router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *        - name
 *        - price
 *        - qnt
 *        - tax
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-generated
 *         name:
 *           type: string
 *           description: Product's Name
 *         price:
 *           type: number
 *           description: Product's Price
 *         unQ:
 *           type: string
 *           description: Product's type of unit (measure)
 *         tax:
 *           type: string
 *           description: Product's applied tax percentage
 *       example:
 *         name: "Cartoon of Milk"
 *         price: "1.30"
 *         unQ: "Unit"
 *         tax: "6"
 *
 */

/**
 * @swagger
 *  tags:
 *    name: Products
 *    description: Operations with the Products
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get All Products
 *     tags: [Products]
 *     responses:
 *       201:
 *         description:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *        description: Error with DB
 */
_router.get("/products", controller.readAllProduct);

/**
 * @swagger
 * /product/{productId}:
 *   get:
 *     summary: Get Product By Id
 *     parameters:
 *      - in: path
 *        name: productId
 *        schema:
 *           type: integer
 *        required: true
 *        description: Numeric ID of the product to get
 *     tags: [Products]
 *     responses:
 *       201:
 *         description:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       204:
 *         description: Product not found
 *       500:
 *        description: Error with DB
 */
_router.get("/product/:productId", controller.readProduct);

/**
 * @swagger
 * /product:
 *   post:
 *     summary: Create new Product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *        description: Error with DB
 */
_router.post("/product", controller.createProduct);

/**
 * @swagger
 * /product/update/{productId}:
 *   patch:
 *     summary: Update Product
 *     parameters:
 *      - in: path
 *        name: productId
 *        schema:
 *           type: integer
 *        required: true
 *        description: Numeric ID of the product to get
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     tags: [Products]
 *     responses:
 *       201:
 *         description:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       204:
 *         description: Product not found
 *       500:
 *        description: Error with DB
 */
_router.patch("/product/update/:productId", controller.updateProduct);

/**
 * @swagger
 * /product/delete/{productId}:
 *   patch:
 *     summary: Delete product
 *     parameters:
 *      - in: path
 *        name: productId
 *        schema:
 *           type: integer
 *        required: true
 *        description: Numeric ID of the product to get
 *     tags: [Products]
 *     responses:
 *       201:
 *         description:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       204:
 *         description: Product not found
 *       500:
 *        description: Error with DB
 */
_router.patch("/product/delete/:productId", controller.deleteProduct);

export const router = _router;
