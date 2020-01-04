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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { message, attention, tech, date } = req.body;
    try {
      const newLog = new Log({
        message,
        attention,
        tech,
        date
      });
      await newLog.save();
      res.json(newLog);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route GET api/logs
// @dec Get all logs
// @access public
router.get("/", async (req, res) => {
  try {
    const logs = await Log.find({}).sort({ date: -1 });
    res.json(logs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route PUT api/logs/:id
// @dec Update a log
// @access public
router.put("/:id", async (req, res) => {
  const { message, attention, tech, date } = req.body;

  // build log object
  const logFields = {};
  if (message) logFields.message = message;
  if (attention) logFields.attention = attention;
  if (tech) logFields.tech = tech;
  if (date) logFields.date = date;

  try {
    let log = await Log.findById(req.params.id);
    if (!log) return res.status(404).json({ msg: "Log not found" });

    log = await Log.findByIdAndUpdate(
      req.params.id,
      { $set: logFields },
      { new: true }
    );

    res.json(log);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route DELETE api/log/:id
// @dec Delete a log
// @access public
router.delete("/:id", async (req, res) => {
  try {
    let log = await Log.findById(req.params.id);
    if (!log) return res.status(404).json({ msg: "Log not found" });
    await Log.findByIdAndRemove(req.params.id);

    res.json({ msg: "Log removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
