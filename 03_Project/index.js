const express = require("express");
let users = require("./MOCK_DATA.json");
const app = express();
const PORT = 8000;
const fs = require("fs");

// MiddleWares

//a middleware that parses incoming form data (like from HTML forms) sent with the application/x-www-form-urlencoded content type.
app.use(express.urlencoded({ extended: false }));

//a middleware in Express that tells your server to automatically parse incoming JSON requests.
app.use(express.json());

//Custom Middleware
app.use((req, res, next) => {
  //   req.myusername = "sumitattri.dev";
  //   console.log("HII from moddleware 1");
  fs.appendFile(
    "./log.txt",
    `\n${Date.now()}:${req.method}${req.path}`,
    (err, data) => {
      next();
    }
  );
});

// app.use((req, res, next) => {
//   console.log("HII from moddleware 2", req.myusername);
//   next();
// });

//API Routes
app.get("/users", (req, res) => {
  const html = `
    <ul>
    ${users.map((user) => `<li> ${user.first_name} </li>`).join("")}
    </ul>
    `;
  res.send(html);
});

app.get("/api/users", (req, res) => {
  //custom-header

  res.setHeader("X-MyName", "Sumit Attri"); // always add X to custom-headers
  console.log(req.headers);

  return res.json(users);
});

app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  //   console.log(req);
  const user = users.find((user) => user.id === id);
  if (!user) {
    return res.status(404).json({ msg: "No user found!" });
  }
  return res.json(user);
});

app.post("/api/users", (req, res) => {
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

  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
    if (!err) {
      return res.status(201).json({ status: " success", id: users.length });
    }
  });
});

app.patch("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const updates = req.body;
  //   console.log(updates);

  let user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Merge old user + new updates
  user = { ...user, ...updates };

  users = users.map((u) => (u.id === id ? user : u));

  // Write updated array back to file
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
    if (err) {
      return res.status(500).json({ message: "Error writing file" });
    }
    res.json({ status: "success", updatedUser: user });
  });
});

app.delete("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);

  const updatedUsers = users.filter((user) => user.id !== Number(id));
  // Write updated array back to file
  fs.writeFile(
    "./MOCK_DATA.json",
    JSON.stringify(updatedUsers, null, 2),
    (err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to delete user" });
      }
      res.json({ message: "User deleted successfully", users: updatedUsers });
    }
  );
});

app.listen(PORT, console.log("Server Started"));
