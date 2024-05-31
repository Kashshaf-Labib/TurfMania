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

app.get('/profile', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    const decoded = jwt.verify(token, '12345');
    const user = await CustomerModel.findById(decoded._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
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
  try {
    const { date, timeSlot } = req.body;
    const turfId = req.params.id;
    const customerId = req.body.customerId || req.headers['x-customer-id'];

    // Check if the customer ID is provided
    if (!customerId) {
      return res.status(401).json({ message: 'Please provide a customer ID' });
    }

    // Find the turf by ID
    const turf = await TurfModel.findById(turfId);
    if (!turf) {
      return res.status(404).json({ message: 'Turf not found' });
    }
    

    // Find the date object corresponding to the provided date
    let turfDate = turf.dates.find(d => d.date.toDateString() === new Date(date).toDateString());
    if (!turfDate) {
        // If the date is not found, add it to the turf's dates array
        const newDate = {
            date: new Date(date),
        }
        turf.dates.push(newDate);
        await turf.save(); // Save the turf document with the new date added
    
        
    }
    turfDate = turf.dates.find(d => d.date.toDateString() === new Date(date).toDateString());
    

    // Check if the selected time slot is already booked
    if (!turfDate.availableTimeSlots.includes(timeSlot)) {
      return res.status(400).json({ message: 'Selected time slot is already booked' });
    }

    // Check if the selected time slot is not available
   

    // Create a new booking
    const newBooking = {
      date: new Date(date),
      timeSlot,
      status: 'pending',
      customer: customerId
    };
   

    // Add the booking to the turf's bookings array
    turf.bookings.push(newBooking);

    // Mark the time slot as unavailable and remove it from available time slots
    turfDate.unavailableTimeSlots.push(timeSlot);
    turfDate.availableTimeSlots = turfDate.availableTimeSlots.filter(slot => slot !== timeSlot);

    // Save the updated turf
    await turf.save();
   
    const newInventoryItem = {
      date: new Date(date),
      time: timeSlot,
      turf: turfId
    };

    // Find the customer by ID
    const customer = await CustomerModel.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Push the new inventory item into the customer's inventory array
    customer.inventory.push(newInventoryItem);

    // Save the updated customer
    await customer.save();


    return res.status(200).json({ message: 'Booking successful', booking: newBooking });
  } catch (err) {
    console.error('Error occurred:', err);
    return res.status(500).json({ message: 'An error occurred while processing the booking' });
  }
});





app.post('/owner/auth/logout', (req, res) => {
  res.clearCookie('Token').status(200).json({message: 'Logged out successfully.'})
});



app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
