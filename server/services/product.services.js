import statusConst from "../common/statusConstants";
import { Op } from "sequelize";
import Models from "../models";
import Helper from "../common/helper";
import { get, Empty, isNull } from "lodash";
import { userRoles, PRODUCT_DIR } from "../common/appConstants";

const _ = {
  get,
  Empty,
  isNull,
};

// List Products

const listProducts = async (req) => {
  let response = statusConst.error;
  const entityParams = _.get(req, "query", {});
  try {
    const entityPagination = Helper.dataPagination(entityParams);
    const products = await Models.Product.findAndCountAll({
      attributes: [
        "id",
        "category_id",
        "product_image",
        "title",
        "description",
        "color_id",
        "price",
        "length",
        "type",
        "quantity",
        "status",
        "createdAt",
      ],
      include: [
        {
          model: Models.Category,
          as: "Category",
          attributes: ["category_name", "category_image", "id"],
        },
        {
          model: Models.Color,
          as: "Color",
          attributes: ["color_name", "id"],
        },
      ],

      offset: entityPagination.offset,
      limit: entityPagination.limit,
      order: [["createdAt", "DESC"]],
    });

    let pagination = entityPagination.pagination;
    pagination["totalPages"] = Math.ceil(
      ((products || {}).count || 0) / pagination.pageSize
    );
    pagination["pageRecords"] = ((products || {}).rows || []).length || 0;
    pagination["count"] = (products || {}).count || 0;

    response = {
      ...statusConst.success,
      pagination,
      data: (products || {}).rows,
    };
  } catch (error) {
    response = {
      ...statusConst.error,
      message: error.message,
    };
  }

  return response;
};

// List All Products
const listAllProducts = async (req) => {
  let response = statusConst.error;

  try {
    const products = await Models.Product.findAll({
      attributes: [
        "id",
        "title",
        "product_image",
        "description",
        "price",
        "length",
        "type",
        "quantity",
        "status",
      ],
      include: [
        {
          model: Models.Category,
          as: "Category",
          attributes: ["category_name", "category_image", "id"],
        },
        {
          model: Models.Color,
          as: "Color",
          attributes: ["color_name", "id"],
        },
      ],

      // order: ["created_at", "DESC"],
    });

    response = {
      ...statusConst.success,
      data: products,
    };
  } catch (error) {
    response = {
      ...statusConst.error,
      message: error.message,
    };
  }
  return response;
};

// Get Product Details

const getProductDetail = async (id, tokenUser) => {
  let response = statusConst.error;

  try {
    if (
      tokenUser.user_role_id == userRoles.USER_ROLE.id &&
      id != tokenUser.id
    ) {
      return {
        ...statusConst.forbidden,
      };
    }

    const product = await Models.Product.findOne({
      attributes: [
        "id",
        "title",
        "product_image",
        "description",
        "category_id",
        "price",
        "color_id",
        "length",
        "type",
        "quantity",
        "status",
      ],
      include: [
        {
          model: Models.Category,
          as: "Category",
          attributes: ["category_name", "id"],
        },
        {
          model: Models.Color,
          as: "Color",
          attributes: ["color_name", "id"],
        },
      ],
      where: {
        [Op.and]: {
          id: id,
        },
      },
    });

    if (!product) {
      return {
        ...statusConst.error,
        message: "Product not found",
      };
    }

    response = {
      ...statusConst.success,
      data: product,
    };
  } catch (error) {
    response = {
      ...statusConst.error,
      message: error.message,
    };
  }

  return response;
};

// Create Product

const createProduct = async (req) => {
  let response = statusConst.error;
  let data = _.get(req, "body", {});
  let filePath;
  let fileName;
  let file;
  if (req.files) {
    //Set Image name and upload path to upload Image
    file = req.files.product_image;
    fileName = `product-${Date.now().toString()}.${
      (file.mimetype || "image/jpeg").split("/")[1] || "jpeg"
    }`;
    filePath = `${PRODUCT_DIR}${fileName}`;

    // Move product image to public folder
    file.mv(filePath, (err) => {
      if (err) {
        responseData = { ...statusConst.error, message: msgConst.uploadFailed };
        fileName = "";
      }
    });
  }
  try {
    const productPayload = {
      category_id: _.get(data, "category_id", 0),
      color_id: _.get(data, "color_id", 0),
      title: _.get(data, "title", {}),
      description: _.get(data, "description", {}),
      price: _.get(data, "price", {}),
      quantity: _.get(data, "quantity", {}),
      type: _.get(data, "type", {}),
      length: _.get(data, "length", {}),
      status: _.get(data, "status", 0),
      product_image: fileName,
    };

    // Create new Product entity
    const product = await Models.Product.create(productPayload, {
      raw: true,
    });

    const productId = _.get(product, "id", 0);

    // Product not created, throw an exception
    if (!productId) {
      return {
        ...statusConst.error,
        message: "Unable to create a new Product",
      };
    }

    response = {
      ...statusConst.success,
      message: "Product created successfully",
    };
  } catch (error) {
    let errors = {};

    // Default message
    response = {
      ...statusConst.error,
      message: error.message,
    };

    try {
      if (
        ["SequelizeValidationError", "SequelizeUniqueConstraintError"].includes(
          error.name
        )
      ) {
        errors = Helper.formatSequelizeErrors(error);
        response = {
          ...statusConst.validationErrors,
          errors,
        };
      }
    } catch (error) {
      response = {
        ...statusConst.error,
        message: error.message,
      };
    }
  }

  return response;
};

// Update Product

const updateProduct = async (req, id) => {
  let response = statusConst.error;
  let data = _.get(req, "body", {});
  let filePath;
  let fileName;
  let file;
  if (req.files) {
    //Set Image name and upload path to upload Image
    file = req.files.product_image;
    fileName = `product-${Date.now().toString()}.${
      (file.mimetype || "image/jpeg").split("/")[1] || "jpeg"
    }`;
    filePath = `${PRODUCT_DIR}${fileName}`;

    // Move product image to public folder
    file.mv(filePath, (err) => {
      if (err) {
        responseData = { ...statusConst.error, message: msgConst.uploadFailed };
        fileName = "";
      }
    });
  }

  try {
    // Check if product is authorised or not
    if (data.user_role_id == userRoles.USER_ROLE.id && id != data.id) {
      return {
        ...statusConst.forbidden,
      };
    }

    //Check if Product exist
    const isProduct = await Models.Product.findOne({
      where: {
        id: id,
      },
    });

    if (!isProduct) {
      return {
        ...statusConst.notFound,
        message: "Product not found",
      };
    }

    const productPayload = {
      category_id: data.category_id || isProduct.category_id,
      title: data.title || isProduct.title,
      product_image: fileName,
      description: data.description || isProduct.description,
      price: data.price || isProduct.price,
      length: data.length || isProduct.length,
      type: data.type || isProduct.type,
      quantity: data.quantity || isProduct.quantity,
      status: data.status || isProduct.status,
      color_id: data.color_id || isProduct.color_id,
    };

    console.log(" Product Payload ------------------>", productPayload);
    await isProduct.update(productPayload);

    response = {
      ...statusConst.success,
      message: "Product updated successfully",
    };
  } catch (error) {
    let errors = {};

    // Default message
    response = {
      ...statusConst.error,
      message: error.message,
    };

    try {
      if (
        ["SequelizeValidationError", "SequelizeUniqueConstraintError"].includes(
          error.name
        )
      ) {
        errors = Helper.formatSequelizeErrors(error);
        response = {
          ...statusConst.validationErrors,
          errors,
        };
      }
    } catch (error) {
      response = {
        ...statusConst.error,
        message: error.message,
      };
    }
  }

  return response;
};

// Delete Product

const deleteProduct = async (id) => {
  let response = statusConst.error;
  try {
    // Check if Product exist
    const isProduct = await Models.Product.findOne({
      where: {
        id: id,
      },
    });

    if (!isProduct) {
      return {
        ...statusConst.error,
        message: "Product not found",
      };
    }

    // Delete Product
    const product = await Models.Product.destroy({
      where: {
        id: id,
      },
    });

    // Product not deleted? throw an exception
    if (product === 0) {
      return {
        ...statusConst.success,
        message: "Product deleted Failed",
      };
    }

    response = {
      ...statusConst.success,
      message: "Product deleted Successfully",
    };
  } catch (error) {
    response = {
      ...statusConst.error,
      message: error.message,
    };
  }
  return response;
};

// Search Product
const searchProduct = async (q, entityParams) => {
  let response = statusConst.error;
  try {
    const entityPagination = Helper.dataPagination(entityParams);

    // Search products
    const products = await Models.Product.findAndCountAll({
      attributes: [
        "id",
        "title",
        "category_id",
        "product_image",
        "description",
        "price",
        "length",
        "type",
        "quantity",
        "status",
        "color_id",
      ],
      include: [
        {
          model: Models.Category,
          as: "Category",
          attributes: ["category_name", "category_image", "id"],
        },
      ],
      where: {
        [Op.or]: {
          title: {
            [Op.like]: `%${q}%`,
          },
          price: {
            [Op.like]: `%${q}%`,
          },
          quantity: {
            [Op.like]: `%${q}%`,
          },
        },
        // [Op.not]: {
        //   user_role_id: userRoles.ADMIN_ROLE.id,
        // },
      },
      offset: entityPagination.offset,
      limit: entityPagination.limit,
    });

    let pagination = entityPagination.pagination;
    pagination["totalPages"] = Math.ceil(
      ((products || {}).count || 0) / pagination.pageSize
    );
    pagination["pageRecords"] = ((products || {}).rows || []).length || 0;

    response = {
      ...statusConst.success,
      pagination,
      data: (products || {}).rows,
    };
  } catch (error) {
    response = {
      ...statusConst.error,
      message: error.message,
    };
  }
  return response;
};

const ProductServices = {
  listProducts,
  listAllProducts,
  getProductDetail,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
};

export default ProductServices;
