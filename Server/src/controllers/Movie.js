

export const create = async (req, res) => {
  try {
    const { error } = genreValidator.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const data = await Genre(req.body).save();
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
    const data = await Genre.find();
    if (!data) {
      throw new Error(`Failed to get Genres`);
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
    const data = await Genre.findById(req.params.id);
    if (!data) {
      throw new Error(`Failed to get Genre detail`);
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
    const { error } = genreValidator.validate(req.body, {
      abortEarly: false,
      allowUnknown: true,
    });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const data = await Genre.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (!data) {
      throw new Error(`Failed to update Genre`);
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

