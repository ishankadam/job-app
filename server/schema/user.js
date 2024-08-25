const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          if (typeof v === "string" || v instanceof String) {
            return false;
          }
        },
        message: "Value is not a  number",
      },
    },

    password: { type: String, required: true },
    workStatus: { type: String, required: true },
    experience: { type: String },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    applied: { type: Array },
  },
  { collection: "Users" }
);

//If database is not present ,value of key is taken and added with an s for creation of database
const user = mongoose.model("user", userSchema);

module.exports = user;
