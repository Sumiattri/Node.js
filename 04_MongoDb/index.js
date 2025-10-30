const express = require("express");
const app = express();
const PORT = 8000;

const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: false }));

//Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/first-db")
  .then(() => console.log("Mongodb connected"))
  .catch((err) => console.log("Mongo Error", err));

//Schema
const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      rquired: true,
      unique: true,
    },
    jobTitle: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  { timestamps: true }
);

// Model
const User = mongoose.model("user", userSchema);

app.post("/api/users", async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.job_title ||
    !body.gender
  ) {
    return res.status(400).json({ msg: "All fields are required" });
  }
  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    jobTitle: body.job_title,
    gender: body.gender,
  });
  console.log(result);

  return res.status(201).json({ msg: "success" });
});

app.get("/users", async (req, res) => {
  const allDbUsers = await User.find({});

  const html = `
  <ul> 
   ${allDbUsers.map((user) => `<li>${user.firstName} </li>`).join("")}
  </ul>
  `;
  res.send(html);
});

app.get("/api/users", async (req, res) => {
  //custom-header
  const allDbUsers = await User.find({});
  return res.json(allDbUsers);
});

app.get("/api/users/:id", async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ msg: "No user found!" });
  }
  return res.json(user);
});

app.patch("/api/users/:id", async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { lastName: "Singh" });
  return res.json({ status: "Success" });
});

app.get("/", (req, res) => {
  return res.end("HII from Server");
});

app.delete("/api/users/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  return res.json({ msg: "Success" });
});

app.listen(PORT, console.log("Server Started at PORT 8000"));
