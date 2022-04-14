import BannerServices from "../services/banner.services";
import statusConst from "../common/statusConstants";
import { validationResult } from "express-validator";
import Validator from "../validators";
import { get, result } from "lodash";

const _ = { get };

const listBanners = async (req, res, next) => {
  BannerServices.listBanners(req)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const listAllBanners = async (req, res, next) => {
  BannerServices.listAllBanners(req)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const getBannerDetail = async (req, res, next) => {
  const id = _.get(req, "params.id", 0);
  const tokenUser = _.get(req, "tokenUser", {});

  BannerServices.getBannerDetail(id, tokenUser)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const createBanner = async (req, res, next) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formatted = Validator.format(errors.array());

    const responseData = { ...statusConst.validationErrors, errors: formatted };
    return res.status(responseData.status).send(responseData);
  }

  BannerServices.createBanner(req)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const updateBanner = async (req, res, next) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formatted = Validator.format(errors.array());

    const responseData = { ...statusConst.validationErrors, errors: formatted };
    return res.status(responseData.status).send(responseData);
  }

  // const formData = _.get(req, "body", {});
  const id = _.get(req, "params.id", 0);
  // formData.user_role_id = _.get(req, "tokenUser.user_role_id", 0);
  // formData.id = _.get(req, "tokenUser.id", 0);

  BannerServices.updateBanner(req, id)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const deleteBanner = async (req, res, next) => {
  const id = _.get(req, "params.id", 0);

  BannerServices.deleteBanner(id)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const searchBanner = async (req, res, next) => {
  const q = _.get(req, "params.q", "");
  const entityParams = _.get(req, "query", {});
  BannerServices.searchBanner(q, entityParams)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const BannerController = {
  listBanners,
  getBannerDetail,
  createBanner,
  updateBanner,
  deleteBanner,
  searchBanner,
  listAllBanners,
};

export default BannerController;
