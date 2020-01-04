const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const Log = require("../models/Log");

// @route POST api/logs
// @dec Add a log
// @access public
router.post(
  "/",
  [
    check("message", "Message is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()})
    }

    const {message, attention, tech, date} = req.body;
    try {
      const newLog = new Log({
        message, attention, tech, date
      })
      await newLog.save();
      res.json(newLog);
    } catch (err) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

// @route GET api/logs
// @dec Get all logs
// @access public
router.get("/", (req, res) => {
  res.send("Get all logs");
});

// @route PUT api/logs/:id
// @dec Update a log
// @access public
router.put("/:id", (req, res) => {
  res.send("Update a log");
});

// @route DELETE api/log/:id
// @dec Delete a log
// @access public
router.delete("/:id", (req, res) => {
  res.send("Delete a log");
});

module.exports = router;
