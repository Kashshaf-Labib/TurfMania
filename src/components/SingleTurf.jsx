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
        </div>
        <BookSingleTurf turfId={id} />
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
