const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const CustomerModel = require("./models/customer");
const TurfModel = require("./models/turf");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require(`jsonwebtoken`);
const TurfOnweModel = require("./models/admin");

const Timeslot = require("./models/timeslot");
const dayjs = require("dayjs");
const Booking = require("./models/booking");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // Update with your frontend URL
    credentials: true,
  })
);

mongoose
  .connect("mongodb://127.0.0.1:27017/turf")
  .then((d) => console.log("Connected to database"))
  .catch((err) => console.log(err));

function calculateEndTime(startTime) {
  const [hours, minutes] = startTime.split(":").map(Number);
  const endTime = new Date();
  endTime.setHours(hours + 1, minutes, 0); // Adding 1 hour to start time
  return `${endTime.getHours()}:${endTime
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
}

app.post("/signup", (req, res) => {
  CustomerModel.create(req.body)
    .then((customers) => {
      res.json(customers);
    })
    .catch((err) => res.json(err));
});
const createDefaultTimeslots = async (turfId) => {
  const today = dayjs();
  const timeslots = [];

  for (let i = 0; i < 30; i++) {
    // Create timeslots for the next 30 days
    const date = today.add(i, "day").toDate();
    const dailyTimeslots = {
      turf_id: turfId,
      date: date,
      timeslots: [],
    };

    for (let hour = 8; hour < 20; hour++) {
      // Assuming timeslots from 8 AM to 8 PM
      dailyTimeslots.timeslots.push({
        start_time: `${hour}:00`,
        end_time: `${hour + 1}:00`,
        is_booked: false,
        booking_id: null,
      });
    }

    timeslots.push(dailyTimeslots);
  }

  await Timeslot.insertMany(timeslots);
};
app.post("/upload-turf", async (req, res) => {
  try {
    console.log("Request received:", req.body);
    const turfData = req.body; // Get turfData directly from the request body
    if (!turfData) {
      console.error("Missing turfData in request body");
      return res
        .status(400)
        .json({ message: "Missing turfData in request body" });
    }

    const newTurf = await TurfModel.create(turfData);
    const savedTurf = await newTurf.save();
    console.log("Turf created:", newTurf);

    await createDefaultTimeslots(newTurf._id);
    console.log("Default timeslots created for turf:", newTurf._id);

    res.status(201).json(newTurf);
  } catch (err) {
    console.error("Error uploading turf:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/all-turfs", async (req, res) => {
  try {
    const allTurfs = await TurfModel.find(); // Find all turfs in the collection
    res.json(allTurfs); // Send the response with all turfs
  } catch (err) {
    console.error(err); // Log any errors
    res.status(500).json({ message: "Internal Server Error" }); // Send an error response
  }
});
app.get("/turfs/:location", async (req, res) => {
  const { location } = req.params; // Get the location parameter from the request

  try {
    const turfs = await TurfModel.find({ location: location }); // Find all turfs with the specified location
    if (!turfs || turfs.length === 0) {
      return res
        .status(404)
        .json({ message: "No turfs found for the specified location" });
    }
    res.json(turfs); // Send the response with the found turfs
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
app.patch("/turf/:id", async (req, res) => {
  const { id } = req.params; // Get the ID of the turf to be updated
  const updates = req.body; // Get the updates from the request body

  try {
    const updatedTurf = await TurfModel.findByIdAndUpdate(id, updates, {
      new: true,
    }); // Find and update the turf by its ID
    if (!updatedTurf) {
      return res.status(404).json({ message: "Turf not found" }); // If turf not found, send 404 response
    }
    res.json(updatedTurf); // Send the response with the updated turf
  } catch (err) {
    console.error(err); // Log any errors
    res.status(500).json({ message: "Internal Server Error" }); // Send an error response
  }
});
app.delete("/turf/:id", async (req, res) => {
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
app.get("/turf/:id", async (req, res) => {
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
});

app.post("/user/auth/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists
    const user = await CustomerModel.findOne({ username });
    if (!user)
      return res.status(401).json({ message: "Invalid username or password" });

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid username or password" });

    // Set a cookie
    const age = 1000 * 60 * 60 * 24 * 7;
    const token = jwt.sign({ _id: user._id }, "12345", { expiresIn: age });
    const { password: user_password, ...userInfo } = user.toObject(); // Fixed typo here

    res
      .cookie("Token", token, {
        httpOnly: true,
        // secure: true, // Uncomment this line if using HTTPS
        maxAge: age,
      })
      .status(200)
      .json({ ...userInfo, token });

    // Respond with a success message
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to login" });
  }
});

app.get("/profile", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, "12345");
    const user = await CustomerModel.findById(decoded._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/user/auth/register", async (req, res) => {
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
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/user/auth/logout", (req, res) => {
  res
    .clearCookie("Token")
    .status(200)
    .json({ message: "Logged out successfully." });
});
app.post("/owner/auth/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists
    const user = await TurfOnweModel.findOne({ username });
    if (!user)
      return res.status(401).json({ message: "Invalid username or password" });

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid username or password" });

    // Set a cookie
    const age = 1000 * 60 * 60 * 24 * 7;
    const token = jwt.sign({ _id: user._id }, "12345", { expiresIn: age });
    const { password: user_password, ...userInfo } = user.toObject(); // Fixed typo here

    res
      .cookie("Token", token, {
        httpOnly: true,
        // secure: true, // Uncomment this line if using HTTPS
        maxAge: age,
      })
      .status(200)
      .json({ ...userInfo, token });

    // Respond with a success message
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to login" });
  }
});

app.post("/owner/auth/register", async (req, res) => {
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
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// POST request to mark time slots as unavailable for a selected date

// POST request to mark time slots as unavailable for a selected date
app.get("/api/available-timeslots", async (req, res) => {
  const { date, turfId } = req.query;

  if (!date || !turfId) {
    return res.status(400).json({ error: "Date and turfId are required" });
  }

  try {
    const startOfDay = dayjs(date).startOf("day").toDate();
    const endOfDay = dayjs(date).endOf("day").toDate();

    console.log(
      `Querying timeslots for turfId: ${turfId}, between ${startOfDay} and ${endOfDay}`
    );

    const timeslot = await Timeslot.findOne({
      turf_id: turfId,
      date: { $gte: startOfDay, $lt: endOfDay },
    }).exec();

    if (!timeslot) {
      return res
        .status(404)
        .json({ message: "No timeslots found for this date" });
    }

    const availableTimeSlots = timeslot.timeslots.filter(
      (slot) => !slot.is_booked
    );

    res.json(availableTimeSlots);
  } catch (error) {
    console.error("Error fetching available timeslots:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/book-turf", async (req, res) => {
  try {
    const { turf_id, user_id, timeslots, date } = req.body;

    // Validate the input
    if (!turf_id || !user_id || !timeslots || !date) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Convert date to start and end of day for consistency
    const startOfDay = dayjs(date).startOf("day").toDate();
    const endOfDay = dayjs(date).endOf("day").toDate();

    // Create bookings and update timeslots
    const bookings = await Promise.all(
      timeslots.map(async (start_time) => {
        // Calculate the end time
        const end_time = calculateEndTime(start_time);
        // Create a booking entry
        const booking = new Booking({
          user_id,
          turf_id,
          start_time,
          end_time,
          date: new Date(date),
        });
        await booking.save();

        // Update the timeslot to mark it as booked and associate the booking_id
        const result = await Timeslot.updateOne(
          {
            turf_id,
            date: { $gte: startOfDay, $lt: endOfDay },
            "timeslots.start_time": start_time,
          },
          {
            $set: {
              "timeslots.$.is_booked": true,
              "timeslots.$.booking_id": booking._id,
            },
          }
        );

        if (result.nModified === 0) {
          throw new Error("Timeslot update failed");
        }

        return booking;
      })
    );

    res.status(201).json({ message: "Booking successful", bookings });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/owner/auth/logout", (req, res) => {
  res
    .clearCookie("Token")
    .status(200)
    .json({ message: "Logged out successfully." });
});

app.get('/api/bookings/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const bookings = await Booking.find({ user_id: userId }).populate('turf_id');
    if (!bookings) {
      return res.status(404).json({ message: 'No bookings found' });
    }
    res.status(200).json({ bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
