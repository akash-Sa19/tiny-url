// const { nanoid } = require("nanoid");
const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  console.log(body);
  if (!body.url) return res.status(400).json({ error: "url is required" });
  //   const shortID = nanoid(8);
  const shortID = shortid();

  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });

  return res.render("home", {
    id: shortID,
  });
  // return res.json({ id: shortID });
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

async function handleDeleteUrl(req, res) {
  try {
    const shortId = req.params.shortId;
    console.log(shortId);
    const result = await URL.findOneAndDelete({ shortId: shortId });
    console.log(result);
    if (!result) {
      return res.status(400).json({ message: "unable to find id" });
    }
    return res
      .status(200)
      .json({ message: "deleted successfully", data: result });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "unable to delete document", error });
  }
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  handleDeleteUrl,
};
