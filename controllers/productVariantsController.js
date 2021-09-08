const ProductVariant = require("../models/ProductVariant");

module.exports.addImagesToVariant = async (req, res, next) => {
  try {
    const variant = await ProductVariant.findOne({
      _id: req.body.variantId,
    });

    let imagesArr = req.files.map((el) => el.path);

    if (imagesArr.length > 0) {
      variant.images.push(...imagesArr);
      await variant.save();
    }

    return res.status(201).json({ variant });
  } catch (err) {
    next(err);
  }
};
