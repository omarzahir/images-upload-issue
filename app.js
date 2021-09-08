require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
app.set("trust proxy", 1);

//Routes

const ProductVariantsRoute = require("./routes/ProductVariantsRoute");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
});

app.use(limiter);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept , Authorization ,X-Auth-Token ,Access-Control-Allow-Headers ,categoryId, categoryType, shippingId, productId, imgUrl, reviewId, orderId, ordersIds, userId, statusOfOrder, page, skip, paymentReqId, productsIds, productsPerPage, sortBy, sortByValue, nototal, limit, variantId, productCode, ticketId, paymentReqId, categoryPropertyId"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

mongoose
  .connect(`MY CONNECTION STRING`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((reult) => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log(err);
    console.log("Connection failed");
  });

app.get("/", async (req, res, next) => {
  try {
    return res.status(200).json({ msg: "up and running.." });
  } catch (err) {
    console.log(err);
    return res.json(err);
  }
});

app.use(express.json());
app.use(helmet());

app.use("/products", ProductVariantsRoute);

app.use((err, req, res, next) => {
  return res
    .status(err.statusCode ? err.statusCode : 500)
    .json({ errArr: [{ msg: err.message }], type: err.type });
});

module.exports = app;
