const mongoose = require("mongoose");

const DataArray = mongoose.model("DataArray", {
  array: [
    {
      header: String,
      data: Array,
    },
  ],
});

module.exports = DataArray;
