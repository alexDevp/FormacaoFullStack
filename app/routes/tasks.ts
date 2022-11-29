import express from "express";
import controller from "../controllers/task";
import cors from "cors";

const _router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *        - title
 *        - description
 *        - userId
 *        - state
 *       properties:
 *         id:
 *           type: id
 *           description: ID auto-generated
 *         title:
 *           type: string
 *           description: Task's Title
 *         description:
 *           type: string
 *           description: Task's Description
 *         userId:
 *           type: string
 *           description: User's Id
 *         state:
 *           type: boolean
 *           description: Task's State
 *       example:
 *         title: "Finish the project"
 *         description: "Refactoring and Rebuilding"
 *         uderId: 1234321erw
 *         state: true
 *
 */

/**
 * @swagger
 *  tags:
 *    name: Tasks
 *    description: Operations with Tasks
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get Tasks
 *     parameters:
 *      - in: path
 *        name: userid
 *        schema:
 *           type: _id
 *        required: true
 *        description: ID of the User to get
 *     tags: [Tasks]
 *     responses:
 *       201:
 *         description: Successfully retrieved all the tasks
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       500:
 *        description: Error with DB
 */
_router.get("/tasks?:userid", controller.readAllTask);

/**
 * @swagger
 * /task?{id}:
 *   get:
 *     summary: Get Task By Id
 *     parameters:
 *      - in: path
 *        name: _id
 *        schema:
 *           type: string
 *        required: true
 *        description: ID of the task to get
 *     tags: [Tasks]
 *     responses:
 *       201:
 *         description:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       204:
 *         description: Task not found
 *       500:
 *        description: Error with DB
 */
_router.get("/task?:id", controller.readTask);

/**
 * @swagger
 * /task:
 *   post:
 *     summary: Create new Task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       500:
 *        description: Error with DB
 */
_router.post("/task", controller.createTask);

/**
 * @swagger
 * /task:
 *   patch:
 *     summary: Update Task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     tags: [Tasks]
 *     responses:
 *       201:
 *         description:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       204:
 *         description: Task not found
 *       500:
 *        description: Error with DB
 */
_router.patch("/task", controller.updateTask);

/**
 * @swagger
 * /task/delete?id={id}:
 *   post:
 *     summary: Delete task
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *           type: string
 *        required: true
 *        description: ID of the Task to delete
 *     tags: [Tasks]
 *     responses:
 *       201:
 *         description:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       204:
 *         description: Task not found
 *       500:
 *        description: Error with DB
 */
_router.post("/task/delete?:id", controller.deleteTask);

export const router = _router;
