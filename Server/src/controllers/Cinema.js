import Cinema from "../models/Cinema.js";
import { cinemaValidator } from "../validations/Cinema.js";

export const create = async (req, res) => {
  try {
    const { error } = cinemaValidator.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const data = await Cinema(req.body).save();
    console.log(data)
    if (!data) {
      throw new Error(`Error creating`);
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

export const get = async (req, res) => {
  try {
    const data = await Cinema.find();
    if (!data) {
      throw new Error(`Failed to get categories`);
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
export const getById = async (req, res) => {
  try {
    const data = await Cinema.findById(req.params.id);
    if (!data) {
      throw new Error(`Failed to get cinema detail`);
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
export const update = async (req, res) => {
  try {
    const { error } = cinemaValidator.validate(req.body, {
      abortEarly: false,
      allowUnknown: true,
    });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const data = await Cinema.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (!data) {
      throw new Error(`Failed to update cinema`);
    }
    return res.status(200).json({
      data,
    });
  } catch (error) {
    return res.json({
      name: error.name,
      message: error.message,
    });
  }
};

export const remove = async (req, res) => {
  try {
    const data = await Cinema.findByIdAndDelete({ _id: req.params.id });
    if (!data) {
      throw new Error(`Failed to delete category`);
    }
    return res.status(200).json({
      message: "Remove success",
      data,
    });
  } catch (error) {
    return res.json({
      name: error.name,
      message: error.message,
    });
  }
};
