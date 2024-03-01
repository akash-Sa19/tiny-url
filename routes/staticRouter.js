const express = require("express");
const URL = require("../models/url");
// const User = require("../models/user");

const router = express.Router();

router.get("/", async (req, res) => {
  // below -> line of code make sure that no one can access homepage without login
  if (!req.user) return res.redirect("/login");
  const allurls = await URL.find({ createdBy: req.user?._id || null });
  return res.render("home", {
    urls: allurls,
  });
});
router.get("/signup", (req, res) => {
  return res.render("signup");
});
router.get("/login", (req, res) => {
  return res.render("login");
});

module.exports = router;
