const express = require('express');
const router = express.Router();

// @route POST api/techs
// @dec Add a tech
// @access public
router.post("/", (req, res) => {
  res.send("Register a tech");
});

// @route GET api/techs
// @dec Get all tech
// @access public
router.get("/", (req, res) => {
  res.send("Get all techs");
});

// @route DELETE api/techs/:id
// @dec Delete a tech
// @access public
router.delete("/:id", (req, res) => {
  res.send("Delete a tech");
});

module.exports = router;
