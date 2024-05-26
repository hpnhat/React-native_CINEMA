import jwt from "jsonwebtoken";
import User from "../models/Account.js";
const { SECRET_CODE } = process.env;

export const checkPermission = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("failed to parse authorization header");
    }
    const decoded = jwt.verify(token, SECRET_CODE);
    if (!decoded) {
      throw new Error("Token error")
    }

    const user = await User.findById(decoded._id);
    if (!user) {
      throw new Error("user not found ");
    }
    if (user.role !== "admin") {
      throw new Error("Role not allowed");
    }
    next();
  } catch (error) {
    return res.status(400).json({
      name: error.name,
      message: error.message,
    });
  }
};
export const verifyTokenAndAdminAuth = (req, res, next) => {
  checkPermission(req, res, () => {
    if(req.user.id == req.params.id || req.user.role == "admin") {
    next()
    } else {
      res.status(403).json("You are not allowed to delete this other user")
    }
  });

}