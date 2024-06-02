// src/pages/SystemAdminDashboard.jsx
import { useState, useEffect } from "react";
import axios from "axios";

function SystemAdminDashboard() {
  const [turfOwners, setTurfOwners] = useState([]);
  const [turfs, setTurfs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTurfOwners = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/turfowners/all"
        );
        setTurfOwners(response.data);
      } catch (err) {
        setError("Error fetching turf owners");
      }
    };

    const fetchTurfs = async () => {
      try {
        const response = await axios.get("http://localhost:3001/turfs");
        setTurfs(response.data);
      } catch (err) {
        setError("Error fetching turfs");
      }
    };

    fetchTurfOwners();
    fetchTurfs();
  }, []);

  const toggleFreeze = async (id, isFreezed) => {
    try {
      await axios.patch(`http://localhost:3001/turfowners/${id}`, {
        isFreezed: !isFreezed,
      });
      setTurfOwners(
        turfOwners.map((owner) =>
          owner._id === id ? { ...owner, isFreezed: !isFreezed } : owner
        )
      );
    } catch (err) {
      setError("Error updating freeze status");
    }
  };

  return (
    <div className="container mx-auto mt-8 p-10">
      <h1 className="text-4xl font-bold text-center mb-8">
        System Admin Dashboard
      </h1>
      {error && <p className="text-red-600 text-center">{error}</p>}
      <h2 className="text-3xl font-bold mb-6">Turf Owners</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {turfOwners.map((owner) => (
          <div
            key={owner._id}
            className="bg-white shadow-md rounded-lg overflow-hidden p-6"
          >
            <h2 className="text-2xl font-bold mb-2">{owner.username}</h2>
            <p className="text-gray-600 mb-1">
              National ID: {owner.nationalId}
            </p>
            <p className="text-gray-600 mb-1">Email: {owner.email}</p>
            <p className="text-gray-600 mb-1">
              Status: {owner.isFreezed ? "Freezed" : "Active"}
            </p>
            <button
              onClick={() => toggleFreeze(owner._id, owner.isFreezed)}
              className={`mt-4 px-4 py-2 rounded ${
                owner.isFreezed ? "bg-green-500" : "bg-red-500"
              } text-white`}
            >
              {owner.isFreezed ? "Unfreeze" : "Freeze"}
            </button>
          </div>
        ))}
      </div>
      <h2 className="text-3xl font-bold mb-6">Current Turfs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {turfs.map((turf) => (
          <div
            key={turf._id}
            className="bg-white shadow-md rounded-lg overflow-hidden p-6"
          >
            <h2 className="text-2xl font-bold mb-2">{turf.name}</h2>
            <p className="text-gray-600 mb-1">Location: {turf.location}</p>
            <p className="text-gray-600 mb-1">
              Facilities: {turf.facilities.join(", ")}
            </p>
            <p className="text-gray-600 mb-1">
              Rate Per Hour: ৳{turf.ratePerHour}
            </p>
            <img
              src={turf.imageURL}
              alt="Turf"
              className="w-full h-48 object-cover mt-4"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SystemAdminDashboard;
