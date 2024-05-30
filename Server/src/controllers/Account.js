import Account from "../models/Account.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { signInValidator, signUpValidator } from "../validations/Account.js";
import textflow from "textflow.js";
console.log(process.env.SECRET_CODE);
textflow.useKey(
  "dxcNXHKvkZ03q5UwISPhcsIwbw4W4guVbgzM3VLoznM6ONDXqq99igDMrmS3YbV6"
);

const { SECRET_CODE } = process.env;
const { REFRESH_CODE } = process.env;
export const getById = async (req, res) => {
  try {
    const data = await Account.findById(req.params.id);
    if (!data) {
      throw new Error(`Failed to get user`);
    }
    data.password = undefined;
    return res.status(200).json({
      message: "Success",
      data,
    });
  } catch (error) {
    return res.json({
      name: error.name,
      message: error.message,
    });
  }
};
export const get = async (req, res) => {
  try {
    const data = await Account.find();
    if (!data) {
      throw new Error(`Failed to get Account`);
    }
    return res.status(200).json({
      message: "Success",
      data,
    });
  } catch (error) {
    return res.json({
      name: error.name,
      message: error.message,
    });
  }
};
export const signUp = async (req, res) => {
  try {
    const { error } = signUpValidator.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({ message: errors });
    }
    const emailExists = await Account.findOne({ email: req.body.email });
    const phoneExists = await Account.findOne({ phone: req.body.phone });
    if (emailExists) {
      return res.status(400).json({
        message: "Email đã tồn tại, vui lòng sử dụng email khác",
      });
    }
    if (phoneExists) {
      return res.status(400).json({
        message: "Số điện thoại đã tồn tại, vui lòng kiểm tra lại",
      });
    }
    const passwordEncryption = await bcrypt.hash(req.body.password, 10);
    const userAccount = await Account({
      ...req.body,
      password: passwordEncryption,
    }).save();

    if (!userAccount) {
      throw new Error(`Error Sign Up`);
    }
    userAccount.password = undefined;
    return res.status(200).json({
      message: "Sign Up Success",
      data: userAccount,
    });
  } catch (error) {
    return res.json({
      name: error.name,
      message: error.message,
    });
  }
};

export const signIn = async (req, res) => {
  try {
    const { error } = signInValidator.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({ message: errors });
    }
    const userExists = await Account.findOne({ phone: req.body.phone });
    if (!userExists) {
      return res.status(400).json({
        message: "Email không tồn tại trên hệ thống",
      });
    }
    const passwordDecrypt = await bcrypt.compare(
      req.body.password,
      userExists.password
    );
    if (!passwordDecrypt) {
      return res.status(400).json({
        message: "Sai mật khẩu, vui lòng thử lại ",
      });
    }
    const accessToken = jwt.sign({ _id: userExists._id }, SECRET_CODE, {
      expiresIn: "27d",
    });
    const refreshToken = jwt.sign({ _id: userExists._id }, REFRESH_CODE, {
      expiresIn: "365d",
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "strict",
    });
    userExists.password = undefined;
    return res.status(200).json({
      message: "Sign In Success",
      data: userExists,
      accessToken,
    });
  } catch (error) {
    return res.json({
      name: error.name,
      message: error.message,
    });
  }
};

export const verify = async (req, res) => {
  try {
    const { phone } = req.body.phone;

    const phoneExists = await Account.findOne({ phone });

    if (phoneExists) {
      return res.status(400).json({
        message: "Số điện thoại đã tồn tại, vui lòng kiểm tra lại",
      });
    }
    let result = await textflow.verifyCode(phone);

    if (result.ok) {
      return res.status(200).json({ success: true });
    }
    return res.status(400).json({ success: false });
  } catch (error) {
    console.error("Error verifying phone:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
const generateAccessToken = (user) => {
  return jwt.sign({ _id: userExists._id }, REFRESH_CODE, {
    expiresIn: "365d",
  });
};
export const refreshToken = async (req, res) => {
  // lay refresh token tu user
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).json("You are not authenticated");
  jwt.verify(refreshToken, REFRESH_CODE, (error, user) => {
    if (error) {
      console.log(error);
    }
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateAccessToken(user);
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "strict",
    });
    res.status(200).json({ accessToken: newAccessToken });
  });
};
export const logOut = (req, res) => {
  res.clearCookie("refreshToken");
  res.status(200).json("ok");
};
