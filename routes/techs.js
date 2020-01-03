const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const Tech = require("../models/Tech");

// @route POST api/techs
// @dec Add a tech
// @access public
router.post(
  "/",
  [
    check("firstName", "First Name is required")
      .not()
      .isEmpty(),
    check("lastName", "Last Name is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName } = req.body;
    try {
      let tech = new Tech({
        firstName,
        lastName
      });
      await tech.save();
      res.json(tech)
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route GET api/techs
// @dec Get all tech
// @access public
router.get("/", async (req, res) => {
  try {
    const techs = await Tech.find({});
    res.json(techs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route DELETE api/techs/:id
// @dec Delete a tech
// @access public
router.delete("/:id", async (req, res) => {
  await Tech.findByIdAndRemove(req.params.id);
  res.json({ mgs: "Tech removed" });
});

module.exports = router;
