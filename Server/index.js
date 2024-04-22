const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const CustomerModel = require("./models/customer");
const TurfModel = require("./models/turf");
const bcrypt = require('bcrypt')
const cookieParser =require('cookie-parser');
const jwt =require(`jsonwebtoken`);
const TurfOnweModel = require("./models/admin");






const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', // Update with your frontend URL
  credentials: true,
}));



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
app.post("/upload-turf", async (req, res) => {
  try {
    const { customers, ...turfData } = req.body; // Extract customers array and other Turf data from request body
    const newTurf = await TurfModel.create(turfData); // Create a new Turf object in the database

    // Check if customers array is provided in the request body
    if (customers && customers.length > 0) {
      // Iterate over each customer ObjectId in the customers array
      for (const customerId of customers) {
        // Find the Customer object by ObjectId
        const customer = await CustomerModel.findById(customerId);
        if (customer) {
          // Add the Turf ObjectId to the customer's turfs array
          customer.turfs.push(newTurf._id);
          // Save the updated customer object
          await customer.save();
        }
      }
    }

    res.json(newTurf); // Send the response with the newly created Turf object
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

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
app.patch('/turf/:id', async (req, res) => {
  const { id } = req.params; // Get the ID of the turf to be updated
  const updates = req.body; // Get the updates from the request body

  try {
    const updatedTurf = await TurfModel.findByIdAndUpdate(id, updates, { new: true }); // Find and update the turf by its ID
    if (!updatedTurf) {
      return res.status(404).json({ message: "Turf not found" }); // If turf not found, send 404 response
    }
    res.json(updatedTurf); // Send the response with the updated turf
  } catch (err) {
    console.error(err); // Log any errors
    res.status(500).json({ message: "Internal Server Error" }); // Send an error response
  }
});
app.delete('/turf/:id', async (req, res) => {
  const { id } = req.params; // Get the ID of the turf to be deleted

  try {
    const deletedTurf = await TurfModel.findByIdAndDelete(id); // Find and delete the turf by its ID
    if (!deletedTurf) {
      return res.status(404).json({ message: "Turf not found" }); // If turf not found, send 404 response
    }
    res.json({ message: "Turf deleted successfully" }); // Send a success response
  } catch (err) {
    console.error(err); // Log any errors
    res.status(500).json({ message: "Internal Server Error" }); // Send an error response
  }
});
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


app.post('/user/auth/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists
    const user = await CustomerModel.findOne({ username });
    if (!user) return res.status(401).json({ message: 'Invalid username or password' });

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: 'Invalid username or password' });

    // Set a cookie
    const age = 1000 * 60 * 60 * 24 * 7;
    const token = jwt.sign({ _id: user._id }, "12345", { expiresIn: age });
    const { password: user_password, ...userInfo } = user.toObject(); // Fixed typo here

    res.cookie("Token", token, {
      httpOnly: true,
      // secure: true, // Uncomment this line if using HTTPS
      maxAge: age,
    }).status(200).json({ ...userInfo ,token});

    // Respond with a success message
   
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to login' });
  }
});


app.post('/user/auth/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object with hashed password
    const newUser = new CustomerModel({
      username: username,
      email: email,
      password: hashedPassword,
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    res.json(savedUser); // Respond with the saved user object
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/user/auth/logout', (req, res) => {
  res.clearCookie('Token').status(200).json({message: 'Logged out successfully.'})
});
app.post('/owner/auth/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists
    const user = await TurfOnweModel.findOne({ username });
    if (!user) return res.status(401).json({ message: 'Invalid username or password' });

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: 'Invalid username or password' });

    // Set a cookie
    const age = 1000 * 60 * 60 * 24 * 7;
    const token = jwt.sign({ _id: user._id }, "12345", { expiresIn: age });
    const { password: user_password, ...userInfo } = user.toObject(); // Fixed typo here

    res.cookie("Token", token, {
      httpOnly: true,
      // secure: true, // Uncomment this line if using HTTPS
      maxAge: age,
    }).status(200).json({ ...userInfo ,token});

    // Respond with a success message
   
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to login' });
  }
});


app.post('/owner/auth/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object with hashed password
    const newUser = new TurfOnweModel({
      username: username,
      email: email,
      password: hashedPassword,
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    res.json(savedUser); // Respond with the saved user object
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// POST request to mark time slots as unavailable for a selected date


// POST request to mark time slots as unavailable for a selected date
app.post('/book/:id', async (req, res) => {
  const { date, unavailableTimeSlots } = req.body;
  const turfId = req.params.id; // Get the turf ID from route parameters

  // Check if the customer ID is present in the request body or headers
  const customerId = req.body.customerId || req.headers['x-customer-id'];

  if (!customerId) {
      return res.status(401).json({ message: 'Please provide a customer ID' });
  }

  try {
      console.log("Starting database update...");
      // Find the turf by ID
      let turf = await TurfModel.findById(turfId);

      if (!turf) {
          throw new Error('Turf not found');
      }

      // Find or create the booking for the selected date
      let booking = await TurfModel.findOne({ turf: turfId, date });

      if (!booking) {
          console.log("Booking not found. Creating new booking...");
          booking = new TurfModel({ turf: turfId, date });
      }

      // Update the unavailable time slots for the selected date
      booking.unavailableTimeSlots = unavailableTimeSlots;

      // Assign the customer ID to the booking
      booking.customer = customerId;

      // Find the customer by ID
      let customer = await CustomerModel.findById(customerId);

      if (!customer) {
          throw new Error('Customer not found');
      }

      // Add the turf ID to the customer's turfs array if not already included
      if (!customer.turfs.includes(turfId)) {
          customer.turfs.push(turfId);
      }

      // Save the updated customer data
      customer = await customer.save();

      // Remove unavailable time slots from available time slots
      booking.availableTimeSlots = booking.availableTimeSlots.filter(slot => !unavailableTimeSlots.includes(slot));

      // Save the updated booking
      await booking.save();
      
      console.log("Database update completed successfully.");

      res.status(200).json({ message: 'Time slots marked as unavailable successfully' });
  } catch (err) {
      console.error("Error occurred:", err);
      res.status(500).json({ message: 'An error occurred while marking time slots as unavailable' });
  }
});




app.post('/owner/auth/logout', (req, res) => {
  res.clearCookie('Token').status(200).json({message: 'Logged out successfully.'})
});



app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
