import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BookSingleTurf from './BookSingleTurf';
import Header from './Header/Header';

const SingleTurf = () => {
  const [date, setDate] = useState('');
  const [turfData, setTurfData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/turf/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTurfData(data);
      } catch (error) {
        console.error('Error fetching turf data:', error);
      }
    };

    fetchData();
  }, [id]);

  if (!turfData) {
    return <div>Loading...</div>;
  }

  const { name, imageURL, location, facilities, ratePerHour } = turfData;
  const googleMapsUrl = `https://maps.google.com/maps?q=${name},${name}&z=14&output=embed`;

  async function handleBook() {
    // Retrieve the customer ID and authentication token from local storage
    const customerData = JSON.parse(localStorage.getItem('user'));
    if (!customerData || !customerData.token || !customerData._id) {
      console.error('User data not found in localStorage or invalid.');
      return;
    }
    const authToken = customerData.token;
    const customerId = customerData._id;

    try {
      const response = await axios.post(
        `http://localhost:3001/book/${id}`,
        {
          date: '2020-9-09',
          timeSlot: '16:00 - 17:00',
          customerId, // Pass the customer ID
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );

      console.log(response);
      // Handle success
    } catch (error) {
      console.error('Error occurred:', error.response); // Log the error response
      if (error.response && error.response.data) {
        console.error('Error data:', error.response.data); // Log additional error data
      }
      // Handle error
    }
  }

  const handleDateChange = selectedDate => {
    setDate(selectedDate);
  };

  return (
    <div>
      <Header />
      <div className="mt-10 px-4 lg:px-24 flex flex-col md:flex-row items-center justify-center">
        <div className="mb-8 md:mr-8">
          <img src={imageURL} alt="Turf" className="h-96" />
        </div>
        <div className="mb-8 md:mb-0">
          <h1 className="text-3xl font-bold mb-4">{name}</h1>
          <p className="text-lg mb-2">Location: {location}</p>
          <p className="text-lg mb-2">Facilities: {facilities}</p>
          <p className="text-lg mb-2">Rate Per Hour: ${ratePerHour}</p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleBook}
          >
            Book Now
          </button>
        </div>
        <BookSingleTurf handleDateChange={handleDateChange} />
      </div>
      <div className="mt-8 px-4 lg:px-24">
        <iframe
          title="Google Maps"
          width="100%"
          height="400"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          src={googleMapsUrl}
        >
          <a href="https://www.gps.ie/">gps systems</a>
        </iframe>
      </div>
    </div>
  );
};

export default SingleTurf;
