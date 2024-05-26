import Category from "../models/Category.js";
import Collection from "../models/Collection.js";
import Product from "../models/Product.js";
import { productValidator } from "../validations/product.js";

export const create = async (req, res) => {
  try {
    const { error } = productValidator.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    const { category, collections } = req.body;

    // Kiểm tra xem Category có tồn tại không
    // const existingCategory = await Category.findById(category);
    // if (!existingCategory) {
    //   throw new Error("Không tìm thấy Category");
    // }

    // Kiểm tra xem các Collection có tồn tại không
    const existingCollections = await Collection.find({ collections });
    if (!existingCollections) {
      throw new Error("Không tìm thấy tất cả các Collection");
    }

    const data = await Product.create(req.body);

    // Cập nhật Category với sản phẩm mới
    // await Category.findByIdAndUpdate(data.category, {
    //   $addToSet: { products: data._id, collections: data.collections },
    // });

    // Cập nhật cd Collection với sản phẩm mới
    await Collection.findByIdAndUpdate(data.collections, {
      $addToSet: {
        products: data._id,
        // , category: data.category
      },
    });
    data.save();
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(400).json({
      name: error.name,
      message: error.message,
    });
  }
};
export const get = async (req, res) => {
  try {
    const { _page, _limit, _sort, _order } = req.query;

    const defaultSort = {
      createdAt: -1, // Sắp xếp theo createdAt theo thứ tự giảm dần (mới nhất trước)
    };

    const options = {
      page: _page ? parseInt(_page, 10) : 1,
      limit: _limit ? parseInt(_limit, 10) : 10,
      sort: {
        [_sort || "createdAt"]: _order === "asc" ? 1 : -1,
      },
      populate: [
        // {
        //   path: "category",
        //   model: "Category",
        //   select: "name",
        // },
        {
          path: "collections",
          model: "Collection",
          select: "name slug category",
        },
      ],
    };

    //  thay đổi từ phía client
    if (_sort && _order) {
      options.sort[_sort] = _order === "asc" ? 1 : -1;
    } else {
      options.sort = defaultSort; // Sắp xếp mặc định theo thời gian mới nhất
    }
    const data = await Product.paginate({}, options);
    if (!data.docs) {
      throw new Error(`Failed to get products`);
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

export const getById = async (req, res) => {
  try {
    const data = await Product.findOne({ slug: req.params.slug }).populate(
      " collections",
      "name"
    );
    if (!data) {
      throw new Error(`Failed to get product detail`);
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

export const update = async (req, res) => {
  try {
    const { error } = productValidator.validate(req.body, {
      abortEarly: false,
      allowUnknown: true,
    });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const oldData = await Product.findById(req.params.id);
    // const removeCategory = await Category.findByIdAndUpdate(oldData.category, {
    //   $pull: {
    //     products: oldData._id,
    //   },
    // });
    // if (!removeCategory) {
    //   throw new Error(`Can't get category`);
    // }
    const removeCollection = await Collections.findByIdAndUpdate(
      oldData.collections,
      {
        $pull: {
          products: oldData._id,
        },
      }
    );
    if (!removeCollection) {
      throw new Error(`Can't get category`);
    }
    const data = await Product.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (!data) {
      throw new Error(`Failed to update product`);
    }
    // const updateCategory = await Category.findByIdAndUpdate(data.category, {
    //   $addToSet: {
    //     products: data._id,
    //   },
    // });
    // if (!updateCategory) {
    //   throw new Error(`Update category not found`);
    // }
    const updateCollection = await Collections.findByIdAndUpdate(
      data.collections,
      {
        $addToSet: {
          products: data._id,
        },
      }
    );
    if (!updateCollection) {
      throw new Error(`Update category not found`);
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
    const data = await Product.findByIdAndDelete({ _id: req.params.id });
    if (!data) {
      throw new Error(`Failed to delete product`);
    }
    // const removeCategory = await Category.findByIdAndUpdate(data.category, {
    //   $pull: {
    //     products: data._id,
    //   },
    // });

    const removeCollection = await Collections.findByIdAndUpdate(
      data.collections,
      {
        $pull: {
          products: data._id,
        },
      }
    );
    if (!removeCollection) {
      throw new Error(`Remove Collection not found`);
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
