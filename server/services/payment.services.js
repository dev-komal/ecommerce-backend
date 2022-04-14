import statusConst from "../common/statusConstants";
const path = require("path");
import { get, Empty, isNull } from "lodash";
const app = require("express")();
const shortid = require("shortid");
const Razorpay = require("razorpay");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

const razorpay = new Razorpay({
  key_id: "rzp_test_HrdPTvMC9edXG5",
  key_secret: "uPofp4JfdhnKksPQZf2BUFUI",
});

app.get("/logo.svg", (req, res) => {
  res.sendFile(path.join(__dirname, "logo.svg"));
});

const _ = { get, Empty, isNull };

const paymentVerification = (req, res, next) => {
  console.log(req.body);

  const crypto = require("crypto");

  const shasum = crypto.createHmac("sha256", secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  console.log(digest, req.headers["x-razorpay-signature"]);

  if (digest === req.headers["x-razorpay-signature"]) {
    console.log("request is legit");

    require("fs").writeFileSync(
      "payment1.json",
      JSON.stringify(req.body, null, 4)
    );
  }
  res.json({ status: "ok" });
};

const createRazorPayment = async (req, res) => {
  // let response = statusConst.error;
  let data = _.get(req, "body", {});
  const payment_capture = 1;
  const amount = 499 * 100;
  const currency = "INR";
  const paymentPayload = {
    amount: amount,
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(paymentPayload);
    console.log(response);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
  }
};

const paymentServices = {
  paymentVerification,
  createRazorPayment,
};

export default paymentServices;
