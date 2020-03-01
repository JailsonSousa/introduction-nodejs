const express = require("express");

const server = express();

server.use(express.json());

const users = [
  "Jailson",
  "Luanderson",
  "Victor",
  "Renan",
  "Venicius",
  "Vini",
  "Ronier"
];

// get all users
server.get("/users", (req, res) => {
  res.json(users);
});

function checkNameExists(req, res, next) {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "User name is required" });

  next();
}

function checkUserInArray(req, res, next) {
  const { index } = req.params;
  const user = users[index];
  if (!user) return res.status(400).json({ error: "User does not exists" });
  req.user = user;
  next();
}

// get user by index
server.get("/user/:index", checkUserInArray, (req, res) => {
  res.json(req.user);
});

// add user

server.post("/user/create", checkNameExists, (req, res) => {
  const { name } = req.body;
  users.push(name);
  res.json(users);
});

// put user

server.put("/user/:index", checkUserInArray, checkNameExists, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;
  users[index] = name;
  res.json(users);
});

// delete user

server.delete("/user/:index", checkUserInArray, (req, res) => {
  const { index } = req.params;
  users.splice(index, 1);
  return res.send();
});

server.listen(3000);
