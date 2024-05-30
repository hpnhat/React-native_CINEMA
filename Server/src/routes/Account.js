import { Router } from "express";
import {
  get,
  getById,
  logOut,
  refreshToken,
  signIn,
  signUp,
  verify,
} from "../controllers/Account.js";
const routerAccount = Router();

routerAccount.post("/sign-up", signUp);
routerAccount.post("/verify", verify);
routerAccount.post("/sign-in", signIn);
routerAccount.post("/log-out", logOut);
routerAccount.get("/user/:id", getById);
routerAccount.get("/user/", get);
routerAccount.post("/refresh", refreshToken);

export default routerAccount;
