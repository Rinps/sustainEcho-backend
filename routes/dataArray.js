const express = require("express");
const router = express.Router();

// Model import
const DataArray = require("../models/DataArray");

// Define routes

// *C*RUD : Create a new data array. Require a BODY parameter containing this parameter: "array", an array contaning objects with two properties: "header" (String) and "data" (Array). Each of these objects will match a line on the frontend display.
router.post("/create", async (req, res) => {
  try {
    const inputArray = [...req.fields.array];

    // Each array contained in newArray should have the same length, so we're going to check that using the testLength function. If the user wants to input blank cell, he must fill the slot with null.
    const testLength = (mainArray) => {
      // The lengthTest variable will switch to false if a list doesn't match the length.
      let lengthTest = true;

      // We're going to compare each array length to the first one.
      const lengthToTest = mainArray[0].data.length;

      // Now iterate through the main array. As soon as an array doesn't match the length, we can stop the loop and return false.
      for (let i = 1; i < mainArray.length; i++) {
        if (mainArray[i].data.length !== lengthToTest) {
          lengthTest = false;
          i = mainArray.length;
        }
      }

      if (lengthTest) {
        return true;
      } else {
        return false;
      }
    };

    if (testLength(inputArray)) {
      // If everything is okay, we add this data array to the database.
      const newArray = new DataArray({
        array: [...inputArray],
      });
      await newArray.save();
      res.status(200).json({ message: "Nothing went wrong, YES!" });
    } else {
      res.status(400).json({ message: "There's a problem with your array." });
    }
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
});

// C*R*UD : Read a data array. Require a single PARAM: the array's ID.
router.get("/:id", async (req, res) => {
  try {
    const arrayId = req.params.id;
    if (arrayId) {
      const arrayToSend = await DataArray.findById(arrayId);
      if (arrayToSend) {
        res.status(200).json(arrayToSend);
      } else {
        res.status(404).json({ message: "No array found with this ID" });
      }
    } else {
      res.status(400).json({ message: "No ID in your request, try again!" });
    }
  } catch (error) {
    res.status(400).json({ message: "Couldn't get your datas" });
  }
});

module.exports = router;
