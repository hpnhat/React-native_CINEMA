import { Router } from "express";
import { checkPermission } from "../middlewares/checkPermission.js";
import { create, get, getById, update } from "../controllers/Theater.js";

const routerTheater = Router();

routerTheater.post("/", create);
routerTheater.get("/", get);
routerTheater.get("/:id", getById);
routerTheater.put("/:id", update);

export default routerTheater;
