const express = require("express");
const app = express();

app.use(express.static("public"));

app.get("/home", (req, res) => {
  res.sendFile(__dirname + "/homepage.html");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});

app.get("/new-order", (req, res) => {
  res.sendFile(__dirname + "/user.html");
});

app.get("/order-history", (req, res) => {
  res.sendFile(__dirname + "/dbms5.html");
});

app.get("/create", (req, res) => {
  res.sendFile(__dirname + "/signup.html")
})

// app.get("/client", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
