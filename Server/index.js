const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const CustomerModel = require("./models/customer");
const TurfModel = require("./models/turf");



const app = express();
app.use(express.json());
app.use(cors());


mongoose.connect("mongodb://127.0.0.1:27017/turf")
.then(d => console.log("Connected to database"))
.catch(err => console.log(err));

app.post("/signup", (req, res) => {
  CustomerModel.create(req.body)
    .then((customers) => {
      res.json(customers);
    })
    .catch((err) => res.json(err));
});
app.post("/upload-turf",async(req,res)=>{
  TurfModel.create(req.body).then((turfs)=>{
    res.json(turfs);
  }).catch((err) => res.json(err));
})
app.get('/all-turfs',async(req,res)=>{
  try {
    const allTurfs = await TurfModel.find(); // Find all turfs in the collection
    res.json(allTurfs); // Send the response with all turfs
  } catch (err) {
    console.error(err); // Log any errors
    res.status(500).json({ message: "Internal Server Error" }); // Send an error response
  }


})
app.get('/turfs/:location',async(req,res)=>{
  const { location } = req.params; // Get the location parameter from the request

  try {
    const turfs = await TurfModel.find({ location: location }); // Find all turfs with the specified location
    if (!turfs || turfs.length === 0) {
      return res.status(404).json({ message: "No turfs found for the specified location" });
    }
    res.json(turfs); // Send the response with the found turfs
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }


})
app.get('/turf/:id', async(req,res)=>{
  try {
    const turf = await TurfModel.findById(req.params.id); // Find turf by _id
    if (!turf) {
      return res.status(404).json({ message: "Turf not found" }); // If turf not found, send 404 response
    }
    res.json(turf); // Send the response with the found turf
  } catch (err) {
    console.error(err); // Log any errors
    res.status(500).json({ message: "Internal Server Error" }); // Send an error response
  }
  


}
)

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
