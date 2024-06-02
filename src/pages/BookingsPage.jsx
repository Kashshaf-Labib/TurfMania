import { useEffect, useState } from "react";
import axios from "axios";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await axios.get(
          `http://localhost:3001/api/bookings/${user._id}`
        );
        setBookings(response.data.bookings);
      } catch (err) {
        setError("Error fetching bookings");
        console.error(err);
      }
    };

    fetchBookings();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto mt-8 p-10">
      <h1 className="text-4xl font-bold text-center mb-8">My Bookings</h1>
      {bookings.length === 0 ? (
        <p className="text-center text-xl">No bookings found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              {booking.turf_id && (
                <img
                  src={booking.turf_id.imageURL}
                  alt="Turf"
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">
                  {booking.turf_id.name}
                </h2>
                <p className="text-gray-600 mb-1">
                  Location: {booking.turf_id.location}
                </p>
                <p className="text-gray-600 mb-1">
                  Facilities: {booking.turf_id.facilities.join(", ")}
                </p>
                <p className="text-gray-600 mb-1">
                  Rate Per Hour:  ৳{booking.turf_id.ratePerHour}
                </p>
                <div className="mt-4">
                  <p className="text-gray-800 mb-1">
                    <span className="font-bold">Start Time:</span>{" "}
                    {booking.start_time}
                  </p>
                  <p className="text-gray-800 mb-1">
                    <span className="font-bold">End Time:</span>{" "}
                    {booking.end_time}
                  </p>
                  <p className="text-gray-800">
                    <span className="font-bold">Date:</span>{" "}
                    {new Date(booking.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
