import statusConst from "../common/statusConstants";
import { Op } from "sequelize";
import Models from "../models";
import Helper from "../common/helper";
import { get, Empty, isNull } from "lodash";
import { userRoles, CATEGORY_DIR } from "../common/appConstants";

const _ = { get, Empty, isNull };

// List Categorys

const listCategorys = async (req) => {
  let response = statusConst.error;
  const entityParams = _.get(req, "query", {});
  try {
    const entityPagination = Helper.dataPagination(entityParams);
    const categorys = await Models.Category.findAndCountAll({
      attributes: ["id", "category_name", "description", "category_image"],
      include: [],

      offset: entityPagination.offset,
      limit: entityPagination.limit,
      order: [["createdAt", "DESC"]],
    });

    let pagination = entityPagination.pagination;
    pagination["totalPages"] = Math.ceil(
      ((categorys || {}).count || 0) / pagination.pageSize
    );
    pagination["pageRecords"] = ((categorys || {}).rows || []).length || 0;
    pagination["count"] = (categorys || {}).count || 0;

    response = {
      ...statusConst.success,
      pagination,
      data: (categorys || {}).rows,
    };
  } catch (error) {
    response = { ...statusConst.error, message: error.message };
  }

  return response;
};

// List All Categorys
const listAllCategorys = async (req) => {
  let response = statusConst.error;

  try {
    const categorys = await Models.Category.findAll({
      attributes: ["id", "category_name", "description", "category_image"],
      where: {
        [Op.not]: {
          // user_role_id: userRoles.ADMIN_ROLE.id,
        },
      },

      order: [["createdAt", "DESC"]],
    });

    response = { ...statusConst.success, data: categorys };
  } catch (error) {
    response = { ...statusConst.error, message: error.message };
  }
  return response;
};

// Get Categorys Details

const getCategoryDetail = async (id, tokenUser) => {
  let response = statusConst.error;

  try {
    if (
      tokenUser.user_role_id == userRoles.USER_ROLE.id &&
      id != tokenUser.id
    ) {
      return { ...statusConst.forbidden };
    }

    const category = await Models.Category.findOne({
      attributes: ["id", "category_name", "description", "category_image"],
      where: {
        [Op.and]: {
          id: id,
          // status: commonStatuses.ACTIVE.id,
        },
      },
    });

    if (!category) {
      return { ...statusConst.error, message: "Catgeory not found" };
    }

    response = { ...statusConst.success, data: category };
  } catch (error) {
    response = { ...statusConst.error, message: error.message };
  }

  return response;
};

// Create Category

const createCategory = async (req) => {
  let response = statusConst.error;
  let data = _.get(req, "body", {});
  let filePath;
  let fileName;
  let file;
  if (req.files) {
    //Set Image name and upload path to upload Image
    file = req.files.category_image;
    fileName = `categroy-${Date.now().toString()}.${
      (file.mimetype || "image/jpeg").split("/")[1] || "jpeg"
    }`;
    filePath = `${CATEGORY_DIR}${fileName}`;

    // Move category image to public folder
    file.mv(filePath, (err) => {
      if (err) {
        responseData = { ...statusConst.error };
        fileName = "";
      }
    });
  }

  try {
    const categoryPayload = {
      category_name: _.get(data, "category_name", {}),
      description: _.get(data, "description", ""),
      category_image: fileName,
    };

    // Create new category entity
    const category = await Models.Category.create(categoryPayload, {
      raw: true,
    });

    const categoryId = _.get(category, "id", 0);

    // Category not created, throw an exception
    if (!categoryId) {
      return {
        ...statusConst.error,
        message: "Unable to create a new Category",
      };
    }

    response = {
      ...statusConst.success,
      message: "Category created successfully",
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

// Update Category

const updateCategory = async (req, id) => {
  let response = statusConst.error;
  let data = _.get(req, "body", {});
  let filePath;
  let fileName;
  let file;
  if (req.files) {
    //Set Image name and upload path to upload Image
    file = req.files.category_image;
    fileName = `category-${Date.now().toString()}.${
      (file.mimetype || "image/jpeg").split("/")[1] || "jpeg"
    }`;
    filePath = `${CATEGORY_DIR}${fileName}`;

    // Move category image to public folder
    file.mv(filePath, (err) => {
      if (err) {
        responseData = { ...statusConst.error, message: msgConst.uploadFailed };
        fileName = "";
      }
    });
  }

  try {
    // Check if Category is authorised or not
    if (data.user_role_id == userRoles.USER_ROLE.id && id != data.id) {
      return { ...statusConst.forbidden };
    }

    //Check if Category exist
    const isCategory = await Models.Category.findOne({
      where: { id: id },
    });

    if (!isCategory) {
      return { ...statusConst.notFound, message: "Category not found" };
    }

    const categoryPayload = {
      category_name: data.category_name || isCategory.category_name,
      description: data.description || isCategory.description,
      category_image: fileName,
    };

    await isCategory.update(categoryPayload);

    response = {
      ...statusConst.success,
      message: "Category updated successfully",
    };
  } catch (error) {
    let errors = {};

    // Default message
    response = { ...statusConst.error, message: error.message };

    try {
      if (
        ["SequelizeValidationError", "SequelizeUniqueConstraintError"].includes(
          error.name
        )
      ) {
        errors = Helper.formatSequelizeErrors(error);
        response = { ...statusConst.validationErrors, errors };
      }
    } catch (error) {
      response = { ...statusConst.error, message: error.message };
    }
  }

  return response;
};

// Delete Category

const deleteCategory = async (id) => {
  let response = statusConst.error;
  try {
    // Check if Category exist
    const isCategory = await Models.Category.findOne({
      where: { id: id },
    });

    if (!isCategory) {
      return { ...statusConst.error, message: "Category not found" };
    }

    // Delete Category
    const category = await Models.Category.destroy({
      where: { id: id },
    });

    // Category not deleted? throw an exception
    if (category === 0) {
      return { ...statusConst.success, message: "Category deleted Failed" };
    }

    response = {
      ...statusConst.success,
      message: "Category deleted Successfully",
    };
  } catch (error) {
    response = { ...statusConst.error, message: error.message };
  }
  return response;
};

// Search Category
const searchCategory = async (q, entityParams) => {
  let response = statusConst.error;
  try {
    const entityPagination = Helper.dataPagination(entityParams);

    // Search Category
    const category = await Models.Category.findAndCountAll({
      attributes: ["id", "category_name", "description", "category_image"],
      include: [],
      where: {
        [Op.or]: {
          category_name: { [Op.like]: `%${q}%` },
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
      ((category || {}).count || 0) / pagination.pageSize
    );
    pagination["pageRecords"] = ((category || {}).rows || []).length || 0;

    response = {
      ...statusConst.success,
      pagination,
      data: (category || {}).rows,
    };
  } catch (error) {
    response = { ...statusConst.error, message: error.message };
  }
  return response;
};

const CategoryServices = {
  listCategorys,
  listAllCategorys,
  getCategoryDetail,
  createCategory,
  updateCategory,
  deleteCategory,
  searchCategory,
};

export default CategoryServices;
