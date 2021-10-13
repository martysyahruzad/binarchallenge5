const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3200;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.set("view engine", "ejs");

app.listen(port, () => {
  console.log("listening");
});

const userData = {
  username: "Marty",
  password: "12345",
  age: "22",
  address: "Philadelphia, USA",
};

app.get("/", (req, res) => {
  res.render("main");
});

app.get("/main", (req, res) => {
  res.render("login");
});

app.get("/game", (req, res) => {
  res.render("game");
});

app.post("/main", (req, res) => {
  const loginReq = req.body;
  if (loginReq.username !== userData.username) {
    res.status(400).send({
      message: "Username is not registered",
    });
  } else if (loginReq.password !== userData.password) {
    res.status(400).send({ message: "Password is incorrect" });
  }
  res.status(200).send({
    message: "Login Successful",
    data: userData,
  });
});
