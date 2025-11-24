const express = require("express");
const urlRouter = require("./routes/url");
const connectToMongodb = require("./connection");
const URL = require("./models/url");

const app = express();
const PORT = 8001;

connectToMongodb("mongodb://127.0.0.1:27017/short-url")
  .then(() => console.log("connected to mongodb"))
  .catch(() => console.log("error conecting to mongodb"));

app.use(express.json());
app.use("/url", urlRouter);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  return res.redirect(entry.redirectUrl);
});

app.get("/", (req, res) => {
  return res.end("Hii there");
});
app.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`));
