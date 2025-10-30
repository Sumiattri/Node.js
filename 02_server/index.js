// const http = require("http");
// const fs = require("fs");
// const url = require("url");
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  return res.end("Hello from HomePage");
});

app.get("/about", (req, res) => {
  return res.end("Hello from About Page" + " hey " + req.query.name);
});

// the callback insde createServer is responsible for processing oncoming request
function myHandler(req, res) {
  //   console.log(req);
  if (req.url === "/favicon.ico") return res.end();
  const log = `${Date.now()}:${req.method}${req.url} new request recieved\n`;
  const myUrl = url.parse(req.url, true);
  console.log(myUrl);

  fs.appendFile("./log.txt", log, (err, data) => {
    switch (myUrl.pathname) {
      case "/":
        res.end("HomePage");
        break;
      case "/about":
        const username = myUrl.query.username;
        res.end(`Hii ${username}`);
        break;
      case "/signup":
        if (req.method === "GET") res.end("This is your Signup Form");
        else if (req.method === "POST") {
          // DB query
          res.end("Success");
        }
        break;
      default:
        res.end("404 Page not found");
    }
  });
}

// const myServer = http.createServer(myHandler);

app.listen(8000, () => console.log("Server Started"));

// const myServer = http.createServer(app);

// myServer.listen(8000, () => console.log("Server Started"));
