import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./SideBar";

const ManageTurfs = () => {
  const [turfs, setTurfs] = useState([]);
  const [editedTurfs, setEditedTurfs] = useState({});
  const [editMode, setEditMode] = useState({});

  useEffect(() => {
    const fetchTurfs = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        try {
          const response = await axios.post(
            "http://localhost:3001/manageturfs",
            {
              turfOwnerId: user._id,
            }
          );
          setTurfs(response.data);
        } catch (error) {
          console.error("Error fetching turfs:", error);
        }
      }
    };

    fetchTurfs();

    return () => {
      setTurfs([]);
    };
  }, []);

  const handleEdit = (turfId) => {
    setEditMode({ ...editMode, [turfId]: true });
  };

  const handleChange = (e, field, turfId) => {
    const value = e.target.value;
    setEditedTurfs({
      ...editedTurfs,
      [turfId]: { ...editedTurfs[turfId], [field]: value },
    });
  };

  const handleSubmit = async (turfId) => {
    try {
      await axios.put(
        `http://localhost:3001/manageturfs/${turfId}`,
        editedTurfs[turfId]
      );
      // Refresh the turfs list after successful update
      const response = await axios.post("http://localhost:3001/manageturfs", {
        turfOwnerId: JSON.parse(localStorage.getItem("user"))._id,
      });
      setTurfs(response.data);
      setEditMode({ ...editMode, [turfId]: false });
      setEditedTurfs({});
    } catch (error) {
      console.error("Error updating turf:", error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Manage Turfs</h1>
        {turfs.length > 0 ? (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {turfs.map((turf) => (
              <div key={turf._id} className="bg-white shadow-md rounded-lg p-4">
                <img
                  src={turf.imageURL}
                  alt={turf.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <h2 className="text-xl font-semibold mt-2">{turf.name}</h2>
                <p className="text-gray-700">Location: {turf.location}</p>
                <p className="text-gray-700">Facilities: {turf.facilities}</p>
                <p className="text-gray-700">
                  Rate: ৳{turf.ratePerHour} per hour
                </p>
                {editMode[turf._id] ? (
                  <>
                    <input
                      type="text"
                      className="w-full mt-2 px-3 py-2 border rounded"
                      value={editedTurfs[turf._id]?.name || turf.name}
                      onChange={(e) => handleChange(e, "name", turf._id)}
                    />
                    <input
                      type="text"
                      className="w-full mt-2 px-3 py-2 border rounded"
                      value={editedTurfs[turf._id]?.location || turf.location}
                      onChange={(e) => handleChange(e, "location", turf._id)}
                    />
                    <input
                      type="text"
                      className="w-full mt-2 px-3 py-2 border rounded"
                      value={
                        editedTurfs[turf._id]?.ratePerHour || turf.ratePerHour
                      }
                      onChange={(e) => handleChange(e, "ratePerHour", turf._id)}
                    />
                    <button
                      className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                      onClick={() => handleSubmit(turf._id)}
                    >
                      Submit
                    </button>
                  </>
                ) : (
                  <button
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => handleEdit(turf._id)}
                  >
                    Edit
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>No turfs found.</p>
        )}
      </div>
    </div>
  );
};

export default ManageTurfs;
