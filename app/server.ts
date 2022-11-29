import http from "http";
import express, { Express } from "express";
import cors from "cors";
import morgan from "morgan";
import { router as TaskRouter } from "./routes/tasks";
import { router as AuthRouter } from "./routes/auth";

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

var allowlist = ["http://localhost:3000"];
var corsOptionsDelegate = function (req: any, callback: any) {
  var corsOptions;
  if (allowlist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

router.use(cors(corsOptionsDelegate));
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

router.use("/", TaskRouter);
router.use("/", AuthRouter);

router.listen(8080, () => {
  console.log("Server started");
});

export default router;
