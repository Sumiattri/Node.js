const fs = require("fs");
const os = require("os");

console.log(os.cpus().length);

// Creating a file synchronously
// fs.writeFileSync("./test.txt", "Hey There!");

// Creating a file asynchronously
// fs.writeFile("./test.txt", "Hey There Async!", (err) => {});

// Reading a file synchronously
// const result = fs.readFileSync("./contact.txt", "utf-8");
// console.log(result);

// sync file read returns us a result of what it has read from the file
// but async read do not return any result of the read, rather it tkes a callback function
// as its third argument and passes the error(if any ) and the result in that callback
// same is the difference b/w write file sync and async

// fs.readFile("contact.txt", "utf-8", (err, result) => {
//   if (err) {
//     console.log("Error: ", err);
//   } else {
//     console.log(result);
//   }
// });

// writeFile replaces the data in any file, if we want to keep previous data and add new one,
// then we use appendFile

// fs.appendFileSync("contact.txt", new Date().getDate().toLocaleString());

// copying a file sync
// fs.cpSync("./contact.txt", "copy.txt");

// deleting a file
// fs.unlinkSync("./copy.txt");

// viewing stats of a file
// const result = fs.statSync("./test.txt");
// console.log(result);

// making a directory/folder
// fs.mkdirSync("my-docs");
// fs.mkdirSync("my-docs/a", { recursive: true });
