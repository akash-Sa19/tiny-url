const express = require("express");
const {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  handleDeleteUrl,
} = require("../controllers/url.js");

const router = express.Router();
router.post("/", handleGenerateNewShortURL);
router.get("/analytics/:shortId", handleGetAnalytics);
router.delete("/delete/:shortId", handleDeleteUrl);

module.exports = router;
