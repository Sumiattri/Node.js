const express = require("express");
const path = require("path");
const connectToMongodb = require("./connection");
const URL = require("./models/url");
const urlRouter = require("./routes/url");
const homeRouter = require("./routes/staticRouter");

const app = express();
const PORT = 8001;

connectToMongodb("mongodb://127.0.0.1:27017/short-url")
  .then(() => console.log("connected to mongodb"))
  .catch(() => console.log("error conecting to mongodb"));

// set the view engine to ejs
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/url", urlRouter);
app.use("/home", homeRouter);

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
  if (!entry) {
    return res.status(404).send("Page not found"); // your custom 404.ejs
  }
  return res.redirect(entry.redirectUrl);
});

app.get("/", (req, res) => {
  return res.end("Hii there");
});

// app.use((req, res) => {
//   res.status(404).send("Page Not Found");
// });

app.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`));
