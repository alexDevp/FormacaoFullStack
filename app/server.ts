import http from "http";
import express, { Express } from "express";
import morgan from "morgan";
import { router as PostRouter } from "./routes/posts";
import { router as AuthRouter } from "./routes/auth";
import { router as ProductRouter } from "./routes/products";

import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

import mongoose from "mongoose";
import mongoConfig from "./config/mongo";
mongoose
  .connect(mongoConfig.url)
  .then(() => {
    console.log("Connected");
  })
  .catch((error) => {
    console.log(error);
  });

const router: Express = express();

router.use(express.urlencoded({ extended: false }));

router.use(express.json());

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Formação",
      version: "0.1.0",
      description: "This is a simple CRUD API",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Alexandre Pereira",
        url: "https://www.alexdevp.github.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:8080/",
      },
    ],
  },
  apis: ["./app/routes/*.ts"],
};

router.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerJSDoc(options))
);
router.use("/", PostRouter);
router.use("/", AuthRouter);
router.use("/", ProductRouter);

router.listen(8080, () => {
  console.log("Servidor started");
});

export default router;
