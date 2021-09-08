const express = require("express");
const router = express.Router({ caseSensitive: true });
const controller = require("../controllers/productVariantsController");
const { upload } = require("../shared/cloudinary");

router.put(
  "/add-variant-images",
  upload.array("image", 10),
  controller.addImagesToVariant
);

module.exports = router;
