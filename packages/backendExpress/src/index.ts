import express, { Application } from "express";
import morgan from "morgan";
import { config } from "./common/config";
import { errorHandler } from "./common/errors/error-handler";
import createRoutes from "./createRoutes";
import bodyParser from "body-parser";
import sequelizeConnection, { dbInit } from "./common/db/connection";
import cors from "cors";

const PORT = config.port;

const app: Application = express();
// @ts-ignore
app.use(bodyParser.urlencoded({ extended: true }));
// @ts-ignore
app.use(bodyParser.json({ type: "application/json" }));

app.use(morgan("tiny"));
app.get("/ping", async (_req, res) => {
  res.send({
    message: "pong",
  });
});

if (process.env.NODE_ENV === "development") {
  app.use(
    cors({
      credentials: true,
      origin: `http://localhost:${process.env.CLIENT_PORT}`,
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
      preflightContinue: false,
      optionsSuccessStatus: 204,
    })
  );
}

createRoutes(app);

app.use(errorHandler);

sequelizeConnection
  .authenticate()
  .then(async () => {
    await dbInit();
    console.log("Connection has been established successfully.");
    app.listen(PORT, () => {
      console.log("Server is running on port", PORT);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  });
