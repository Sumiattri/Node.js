const express = require("express");
const app = express();
const PORT = 8000;
const userRouter = require("./routes/user");
const { connectMongoDB } = require("./connection");
const { logReqRes } = require("./middlewares");

app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));
app.use("/api/user", userRouter);

connectMongoDB("mongodb://127.0.0.1:27017/first-db").then(() =>
  console.log("mongodb connected")
);

app.get("/", (req, res) => {
  return res.end("HII from Server");
});
app.listen(PORT, console.log("Server Started at PORT 8000"));
