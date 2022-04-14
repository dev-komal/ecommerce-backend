import statusConst from "../common/statusConstants";
import { Op } from "sequelize";
import Models from "../models";
import Helper from "../common/helper";
import { get, Empty, isNull } from "lodash";
import { userRoles, BANNER_DIR } from "../common/appConstants";

const _ = { get, Empty, isNull };

// List Banners

const listBanners = async (req) => {
  let response = statusConst.error;
  const entityParams = _.get(req, "query", {});
  try {
    const entityPagination = Helper.dataPagination(entityParams);
    const banners = await Models.Banner.findAndCountAll({
      attributes: ["id", "banner_image", "banner_name"],
      include: [],

      offset: entityPagination.offset,
      limit: entityPagination.limit,
      order: [["createdAt", "DESC"]],
    });

    let pagination = entityPagination.pagination;
    pagination["totalPages"] = Math.ceil(
      ((banners || {}).count || 0) / pagination.pageSize
    );
    pagination["pageRecords"] = ((banners || {}).rows || []).length || 0;
    pagination["count"] = (banners || {}).count || 0;

    response = {
      ...statusConst.success,
      pagination,
      data: (banners || {}).rows,
    };
  } catch (error) {
    response = { ...statusConst.error, message: error.message };
  }

  return response;
};

// List All Banners
const listAllBanners = async (req) => {
  let response = statusConst.error;

  try {
    const banners = await Models.Banner.findAll({
      attributes: ["id", "banner_image", "banner_name"],

      order: [["createdAt", "DESC"]],
    });

    response = { ...statusConst.success, data: banners };
  } catch (error) {
    response = { ...statusConst.error, message: error.message };
  }
  return response;
};

// Get Banners Details

const getBannerDetail = async (id, tokenUser) => {
  let response = statusConst.error;

  try {
    if (
      tokenUser.user_role_id == userRoles.USER_ROLE.id &&
      id != tokenUser.id
    ) {
      return { ...statusConst.forbidden };
    }

    const banner = await Models.Banner.findOne({
      attributes: ["id", "banner_image", "banner_name"],
      where: {
        [Op.and]: {
          id: id,
        },
      },
    });

    if (!banner) {
      return { ...statusConst.error, message: "Banner not found" };
    }

    response = { ...statusConst.success, data: banner };
  } catch (error) {
    response = { ...statusConst.error, message: error.message };
  }

  return response;
};

// Create Banners

const createBanner = async (req) => {
  let response = statusConst.error;
  let data = _.get(req, "body", {});
  let filePath;
  let fileName;
  let file;
  if (req.files) {
    //Set Image name and upload path to upload Image
    file = req.files.banner_image;
    fileName = `banner-${Date.now().toString()}.${
      (file.mimetype || "image/jpeg").split("/")[1] || "jpeg"
    }`;
    filePath = `${BANNER_DIR}${fileName}`;

    // Move banner image to public folder
    file.mv(filePath, (err) => {
      if (err) {
        responseData = { ...statusConst.error, message: msgConst.uploadFailed };
        fileName = "";
      }
    });
  }

  try {
    // Check if Banner is authorised or not
    if (data.user_role_id == userRoles.USER_ROLE.id && id != data.id) {
      return { ...statusConst.forbidden };
    }

    const bannerPayload = {
      banner_name: _.get(data, "banner_name", {}),
      banner_image: fileName,
    };

    // Create new banner entity
    const banner = await Models.Banner.create(bannerPayload, {
      raw: true,
    });

    const bannerId = _.get(banner, "id", 0);

    // banner not created, throw an exception
    if (!bannerId) {
      return {
        ...statusConst.error,
        message: "Unable to create a new Banner",
      };
    }

    response = {
      ...statusConst.success,
      message: "Banner created successfully",
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

// Update Banner

const updateBanner = async (req, id) => {
  let response = statusConst.error;
  let data = _.get(req, "body", {});
  let filePath;
  let fileName;
  let file;
  if (req.files) {
    //Set Image name and upload path to upload Image
    file = req.files.banner_image;
    fileName = `banner-${Date.now().toString()}.${
      (file.mimetype || "image/jpeg").split("/")[1] || "jpeg"
    }`;
    filePath = `${BANNER_DIR}${fileName}`;

    // Move banner image to public folder
    file.mv(filePath, (err) => {
      if (err) {
        responseData = { ...statusConst.error, message: msgConst.uploadFailed };
        fileName = "";
      }
    });
  }

  try {
    // Check if Banner is authorised or not
    if (data.user_role_id == userRoles.USER_ROLE.id && id != data.id) {
      return { ...statusConst.forbidden };
    }

    //Check if Banner exist
    const isBanner = await Models.Banner.findOne({
      where: { id: id },
    });

    if (!isBanner) {
      return { ...statusConst.notFound, message: "Banner not found" };
    }

    const bannerPayload = {
      banner_name: data.banner_name || isBanner.banner_name,
      banner_image: fileName,
    };

    await isBanner.update(bannerPayload);

    response = {
      ...statusConst.success,
      message: "Banner updated successfully",
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

// Delete Banner

const deleteBanner = async (id) => {
  let response = statusConst.error;
  try {
    // Check if Banner exist
    const isBanner = await Models.Banner.findOne({
      where: { id: id },
    });

    if (!isBanner) {
      return { ...statusConst.error, message: "Banner not found" };
    }

    // Delete Banner
    const banner = await Models.Banner.destroy({
      where: { id: id },
    });

    // Banner not deleted? throw an exception
    if (banner === 0) {
      return { ...statusConst.success, message: "Banner deleted Failed" };
    }

    response = {
      ...statusConst.success,
      message: "Banner deleted Successfully",
    };
  } catch (error) {
    response = { ...statusConst.error, message: error.message };
  }
  return response;
};

// Search Banner
const searchBanner = async (q, entityParams) => {
  let response = statusConst.error;
  try {
    const entityPagination = Helper.dataPagination(entityParams);

    // Search Banner
    const banner = await Models.Banner.findAndCountAll({
      attributes: ["id", "banner_image"],
      include: [],
      where: {
        [Op.or]: {
          id: { [Op.like]: `%${q}%` },
          banner_image: { [Op.like]: `%${q}%` },
        },
      },
      offset: entityPagination.offset,
      limit: entityPagination.limit,
    });

    let pagination = entityPagination.pagination;
    pagination["totalPages"] = Math.ceil(
      ((banner || {}).count || 0) / pagination.pageSize
    );
    pagination["pageRecords"] = ((banner || {}).rows || []).length || 0;

    response = {
      ...statusConst.success,
      pagination,
      data: (banner || {}).rows,
    };
  } catch (error) {
    response = { ...statusConst.error, message: error.message };
  }
  return response;
};

const BannerServices = {
  listBanners,
  listAllBanners,
  getBannerDetail,
  createBanner,
  updateBanner,
  deleteBanner,
  searchBanner,
};

export default BannerServices;
