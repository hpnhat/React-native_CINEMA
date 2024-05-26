import { Router } from "express";
import routerAccount from "./account.js";
import routerCinema from "./Cinema.js";
import routerGenre from "./Genre.js";
import routerTheater from "./Theater.js";
const router = Router();

router.use("/account", routerAccount);
router.use("/cinema", routerCinema);
router.use("/genre", routerGenre);
router.use("/theater", routerTheater);
export default router;
