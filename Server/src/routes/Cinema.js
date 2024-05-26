import { Router } from "express";
import { checkPermission } from "../middlewares/checkPermission.js";
import { create, get, getById, remove, update } from "../controllers/Cinema.js";

const routerCinema = Router();

routerCinema.post("/", create);
routerCinema.get("/", get);
routerCinema.get("/:id", getById);
routerCinema.put("/:id", update);
routerCinema.delete("/:id", remove);

export default routerCinema;
