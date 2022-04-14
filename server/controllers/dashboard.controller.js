import DashboardServices from "../services/dashoboard.services";
import { get, result } from "lodash";
const _ = { get };

const countProducts = async (req, res, next) => {
  DashboardServices.countProducts(req)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const countUsers = async (req, res, next) => {
  DashboardServices.countUsers(req)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
};

const DashboardController = {
  countProducts,
  countUsers,
};

export default DashboardController;
