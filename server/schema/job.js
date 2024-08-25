const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    jobId: {
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

    companyName: { type: String, required: true },
    position: { type: String, required: true },
    contract: { type: String, required: true },
    location: { type: String, required: true },
    applied: { type: Array, required: true },
  },
  { collection: "Jobs" }
);

//If database is not present ,value of key is taken and added with an s for creation of database
const Job = mongoose.model("Job", JobSchema);

module.exports = Job;
