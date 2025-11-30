const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortUrl(req, res) {
  const requestUrl = req.body.url;

  if (!requestUrl) return res.status(400).json({ error: "url is required" });
  const shortID = shortid.generate(8);
  await URL.create({
    shortId: shortID,
    redirectUrl: requestUrl,
  });

  // return res.render("home", { id: shortID });
  return res.redirect("/home?id=" + shortID);
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = { handleGenerateNewShortUrl, handleGetAnalytics };
