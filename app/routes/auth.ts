import express from 'express';
import controller from '../controllers/auth';
const _router = express.Router();

 /**
   * @swagger
   * components:
   *   schemas:
   *     Token: 
   *        type: object
   *        example:
   *            Authorization: Bearer <token>
   *             
   *     User:
   *       type: object
   *       required:
   *        - name
   *        - email
   *        - password
   *       properties:
   *         id:
   *           type: integer
   *           description: ID auto-generated
   *         name:
   *           type: string
   *           description: User's Name
   *         email:
   *           type: string
   *           description: User's Email
   *         password:
   *           type: string
   *           description: User's Password
   *       example:
   *         name: "Super User"
   *         email: "SU@email.com"
   *         password: "ere+rwrewrw"
   *
   */

  /**
   * @swagger
   *  tags:
   *    name: Authentication
   *    description: Operations with the User
   */

  /**
   * @swagger
   * /signup:
   *   post:
   *     summary: Create a new user
   *     tags: [Authentication]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/User'
   *     responses:
   *       200:
   *         description:
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       400:
   *         description: Email and Password cannot be empty
   *       502:
   *         description: Server Error - Couldn't save the user in the DB
   */
_router.post('/signup', controller.signup);

 /**
   * @swagger
   * /login:
   *   post:
   *     summary: Login with existing user
   *     tags: [Authentication]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/User'
   *     responses:
   *       200:
   *         description:
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Token'
   *       204:
   *         description: User not found
   *       400: 
   *        description: Wrong email/password combination
   */
_router.post('/login', controller.login);

export const router = _router;