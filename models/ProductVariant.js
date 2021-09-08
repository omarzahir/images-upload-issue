const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const variantSchema = new Schema(
  {
    // The rest of the schema is hidden to focus on the main problem =)
    images: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ProductVariant", variantSchema);
