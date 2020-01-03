const express = require('express');
const router = express.Router();

// @route POST api/logs
// @dec Add a log
// @access public
router.post("/", (req, res) => {
  res.send("Add a log");
});

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
