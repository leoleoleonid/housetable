import { Application } from "express";
import router from "./modules/House/house.router";

export default function createRoutes(app: Application) {
  app.use("/api/house", router);
  // other routes ...
}
