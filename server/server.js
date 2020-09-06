const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));
app.use(express.json());

const db = require("./app/models");
const Role = db.role;

db.sequelize.sync(/*{ force: true }*/).then(() => {
  /*console.log("Drop and Resync Db");
  initial();*/
});

function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });
}

app.get("/", (req, res) => {
  res.json({ message: "Welcome to john paul web" });
});

// routes
require("./app/routes/auth")(app);
require("./app/routes/user")(app);

app.listen(8080, () => console.log("App is running on port:8080"));
