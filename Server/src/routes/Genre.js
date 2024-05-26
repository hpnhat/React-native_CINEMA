import { Router } from "express";
import { checkPermission } from "../middlewares/checkPermission.js";
import { create, get, getById, update } from "../controllers/Genre.js";

const routerGenre = Router();

routerGenre.post("/", create);
routerGenre.get("/", get);
routerGenre.get("/:id", getById);
routerGenre.put("/:id", update);

export default routerGenre;
