const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const CustomerModel = require("./models/customer");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/customer");

app.post("/signup", (req, res) => {
  CustomerModel.create(req.body)
    .then((customers) => {
      res.json(customers);
    })
    .catch((err) => res.json(err));
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  CustomerModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("Success");
      } else {
        res.json("Password is incorrect");
      }
    } else {
      res.json("No Record exists");
    }
  });
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
