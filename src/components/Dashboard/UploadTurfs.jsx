// import { useState, useEffect } from "react";
// import React from "react";
// import { Button, Label, TextInput } from "flowbite-react";
// import DashBoardLayout from "./DashBoardLayout";
// import axios from "axios";

// const UploadTurfs = () => {
//   const [uploadStatus, setUploadStatus] = useState(null);
//   const [isFreezed, setIsFreezed] = useState(null);

//   useEffect(() => {
//     const fetchOwnerStatus = async () => {
//       try {
//         const user = JSON.parse(localStorage.getItem("user"));
//         const response = await axios.post(
//           "http://localhost:3001/turfowners/status",
//           { turfOwnerId: user._id }
//         );
//         console.log(user._id);
//         setIsFreezed(response.data.isFreezed);
//       } catch (err) {
//         console.error("Error fetching owner status", err);
//       }
//     };
//     fetchOwnerStatus();
//   }, []);

//   const formRef = React.createRef();

//   const handleUpload = async (event) => {
//     event.preventDefault();
//     if (isFreezed) {
//       setUploadStatus("freezed");
//       return;
//     }
//     const form = formRef.current;
//     const formData = new FormData(form);

//     // Get the values from the form data
//     const name = formData.get('name');
//     const location = formData.get('location');
//     const imageURL = formData.get('imageURL');
//     const facilities = formData.get('facilities');
//     const ratePerHour = formData.get('ratePerHour');

//     // Create turf object with form data
//     const turfObject = {
//       name,
//       location,
//       imageURL,
//       facilities,
//       ratePerHour,
//     };

//     try {
//       const response = await axios.post(
//         "http://localhost:3001/upload-turf",
//         turfObject
//       );
//       if (response.status === 201) {
//         form.reset();
//         setUploadStatus("success");
//       } else {
//         throw new Error("Upload failed");
//       }
//     } catch (error) {
//       console.error("Error uploading turf:", error);
//       setUploadStatus("error");
//     }
//   };

//   return (
//     <div className="flex">
//       <DashBoardLayout />
//       <div className="mt-15 ml-16 grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
//         <form ref={formRef} onSubmit={handleUpload}>
//           <div className="mb-2 block">
//             <Label htmlFor="name" value="Turf Name" className="text-2xl" />
//           </div>
//           <TextInput
//             id="name"
//             name="name"
//             type="text"
//             sizing="lg"
//             className="w-full md:w-96"
//           />
//           <div className="mb-2 block">
//             <Label htmlFor="location" value="Location" className="text-2xl" />
//           </div>
//           <TextInput
//             id="location"
//             name="location"
//             type="text"
//             sizing="lg"
//             className="w-full md:w-96"
//           />
//           <div className="mb-2 block">
//             <Label htmlFor="imageURL" value="Image URL" className="text-2xl" />
//           </div>
//           <TextInput
//             id="imageURL"
//             name="imageURL"
//             type="text"
//             sizing="lg"
//             className="w-full md:w-96"
//           />
//           <div className="mb-2 block">
//             <Label
//               htmlFor="facilities"
//               value="Facilities"
//               className="text-2xl"
//             />
//           </div>
//           <TextInput
//             id="facilities"
//             name="facilities"
//             type="text"
//             sizing="lg"
//             className="w-full md:w-96"
//           />
//           <div className="mb-2 block">
//             <Label
//               htmlFor="ratePerHour"
//               value="Rate Per Hour"
//               className="text-2xl"
//             />
//           </div>
//           <TextInput
//             id="ratePerHour"
//             name="ratePerHour"
//             type="number"
//             sizing="lg"
//             className="w-full md:w-96"
//           />
//           <div className="flex justify-center">
//             <Button className="mt-10 w-96 h-14" type="submit">
//               Upload Turf
//             </Button>
//           </div>
//           {uploadStatus === "success" && (
//             <p className="text-green-600 mt-2">Turf uploaded successfully!</p>
//           )}
//           {uploadStatus === "error" && (
//             <p className="text-red-600 mt-2">
//               Error uploading turf. Please try again.
//             </p>
//           )}
//           {uploadStatus === "freezed" && (
//             <p className="text-red-600 mt-2">
//               Account is freezed. Cannot upload turf.
//             </p>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UploadTurfs;

import { useState, useEffect, useRef } from "react";
import React from "react";
import { Button, Label, TextInput, Textarea } from "flowbite-react";
import DashBoardLayout from "./DashBoardLayout";
import axios from "axios";

const UploadTurfs = () => {
  const [uploadStatus, setUploadStatus] = useState(null);
  const [isFreezed, setIsFreezed] = useState(null);

  useEffect(() => {
    const fetchOwnerStatus = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await axios.post(
          "http://localhost:3001/turfowners/status",
          { turfOwnerId: user._id }
        );
        setIsFreezed(response.data.isFreezed);
      } catch (err) {
        console.error("Error fetching owner status", err);
      }
    };
    fetchOwnerStatus();
  }, []);

  const formRef = useRef(null);

  const handleUpload = async (event) => {
    event.preventDefault();
    if (isFreezed) {
      setUploadStatus("freezed");
      return;
    }
    const form = formRef.current;
    const formData = new FormData(form);

    // Get the values from the form data
    const name = formData.get("name");
    const location = formData.get("location");
    const imageURL = formData.get("imageURL");
    const facilities = formData.get("facilities");
    const ratePerHour = formData.get("ratePerHour");
    const latitude = formData.get("latitude");
    const longitude = formData.get("longitude");
    const googleMapLink = formData.get("googleMapLink");

    // Create turf object with form data
    const turfObject = {
      name,
      location,
      imageURL,
      facilities,
      ratePerHour,
      latitude,
      longitude,
      googleMapLink,
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/upload-turf",
        turfObject
      );
      if (response.status === 201) {
        form.reset();
        setUploadStatus("success");
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Error uploading turf:", error);
      setUploadStatus("error");
    }
  };

  return (
    <div className="flex">
      <DashBoardLayout />
      <div className="mt-10 ml-16 p-6 bg-white rounded-lg shadow-lg w-full max-w-2xl">
        <form ref={formRef} onSubmit={handleUpload}>
          <div className="mb-4">
            <Label htmlFor="name" value="Turf Name" className="text-lg" />
            <TextInput
              id="name"
              name="name"
              type="text"
              sizing="md"
              className="w-full"
              placeholder="Enter turf name"
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="location" value="Location" className="text-lg" />
            <TextInput
              id="location"
              name="location"
              type="text"
              sizing="md"
              className="w-full"
              placeholder="Enter location"
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="imageURL" value="Image URL" className="text-lg" />
            <TextInput
              id="imageURL"
              name="imageURL"
              type="text"
              sizing="md"
              className="w-full"
              placeholder="Enter image URL"
              required
            />
          </div>
          <div className="mb-4">
            <Label
              htmlFor="facilities"
              value="Facilities"
              className="text-lg"
            />
            <Textarea
              id="facilities"
              name="facilities"
              type="text"
              sizing="md"
              className="w-full"
              placeholder="Enter facilities"
              required
            />
          </div>
          <div className="mb-4">
            <Label
              htmlFor="ratePerHour"
              value="Rate Per Hour"
              className="text-lg"
            />
            <TextInput
              id="ratePerHour"
              name="ratePerHour"
              type="number"
              sizing="md"
              className="w-full"
              placeholder="Enter rate per hour"
              required
            />
          </div>
          <div className="mb-4">
            <Label
              htmlFor="googleMapLink"
              value="Google Map Link (Optional)"
              className="text-lg"
            />
            <TextInput
              id="googleMapLink"
              name="googleMapLink"
              type="text"
              sizing="md"
              className="w-full"
              placeholder="Enter Google Map link (Optional)"
            />
          </div>
          <div className="flex justify-center">
            <Button className="mt-5 w-full md:w-auto px-6 py-3" type="submit">
              Upload Turf
            </Button>
          </div>
          {uploadStatus === "success" && (
            <p className="text-green-600 mt-4 text-center">
              Turf uploaded successfully!
            </p>
          )}
          {uploadStatus === "error" && (
            <p className="text-red-600 mt-4 text-center">
              Error uploading turf. Please try again.
            </p>
          )}
          {uploadStatus === "freezed" && (
            <p className="text-red-600 mt-4 text-center">
              Account is freezed. Cannot upload turf.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default UploadTurfs;
