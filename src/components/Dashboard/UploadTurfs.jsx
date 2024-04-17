import { Button, Label, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import DashBoardLayout from './DashBoardLayout';

const UploadTurfs = () => {
  // Create a state to track upload status
  const [uploadStatus, setUploadStatus] = useState(null);

  // Create a ref for the form element
  const formRef = React.createRef();

  // Handle form submission
  const handleUpload = event => {
    event.preventDefault();
    const form = formRef.current; // Access the form element using ref
    const formData = new FormData(form);

    // Get the values from the form data
    const name = formData.get('name');
    const location = formData.get('location');
    const imageURL = formData.get('imageURL');
    const facilities = formData.get('facilities');
    const ratePerHour = formData.get('ratePerHour');

    // Create turf object with form data
    const turfObject = {
      name,
      location,
      imageURL,
      facilities,
      ratePerHour,
    };

    // Log the values (or replace with your server interaction logic)
    console.log(turfObject);

    fetch('http://localhost:3001/upload-turf', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(turfObject),
    })
      .then(res => {
        if (res.ok) {
          // Reset form fields
          form.reset();
          setUploadStatus('success'); // Set upload status to success
          return res.json();
        } else {
          throw new Error('Upload failed');
        }
      })
      .then(data => {
        // Show success message to user
        alert('Turf Uploaded Successfully');
      })
      .catch(error => {
        // Show error message to user
        console.error('Error uploading turf:', error);
        setUploadStatus('error'); // Set upload status to error
      });
  };

  return (
    <div className="flex">
      <DashBoardLayout />
      <div className="mt-15 ml-16 grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
        {/* Form element with ref and onSubmit handler */}
        <form ref={formRef} onSubmit={handleUpload}>
          {/* Turf Name input */}
          <div className="mb-2 block">
            <Label htmlFor="name" value="Turf Name" className="text-2xl" />
          </div>
          <TextInput
            id="name"
            name="name"
            type="text"
            sizing="lg"
            className="w-full md:w-96"
          />
          {/* Location input */}
          <div className="mb-2 block">
            <Label htmlFor="location" value="Location" className="text-2xl" />
          </div>
          <TextInput
            id="location"
            name="location"
            type="text"
            sizing="lg"
            className="w-full md:w-96"
          />
          {/* Image URL input */}
          <div className="mb-2 block">
            <Label htmlFor="imageURL" value="Image URL" className="text-2xl" />
          </div>
          <TextInput
            id="imageURL"
            name="imageURL"
            type="text"
            sizing="lg"
            className="w-full md:w-96"
          />
          {/* Facilities input */}
          <div className="mb-2 block">
            <Label
              htmlFor="facilities"
              value="Facilities"
              className="text-2xl"
            />
          </div>
          <TextInput
            id="facilities"
            name="facilities"
            type="text"
            sizing="lg"
            className="w-full md:w-96"
          />
          {/* Hourly Rate input */}
          <div className="mb-2 block">
            <Label
              htmlFor="ratePerHour"
              value="Rate Per Hour"
              className="text-2xl"
            />
          </div>
          <TextInput
            id="ratePerHour"
            name="ratePerHour"
            type="number"
            sizing="lg"
            className="w-full md:w-96"
          />
          {/* Submit button */}
          <div className="flex justify-center">
            <Button className="mt-10 w-96 h-14" type="submit">
              Upload Turf
            </Button>
          </div>
          {/* Show upload status */}
          {uploadStatus === 'success' && (
            <p className="text-green-600 mt-2">Turf uploaded successfully!</p>
          )}
          {uploadStatus === 'error' && (
            <p className="text-red-600 mt-2">
              Error uploading turf. Please try again.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default UploadTurfs;
