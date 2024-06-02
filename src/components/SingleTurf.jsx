// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import BookSingleTurf from './BookSingleTurf';
// import Header from './Header/Header';
// import ReviewForm from './ReviewForm';
// import axios from 'axios';
// import { FaStar } from 'react-icons/fa';

// const SingleTurf = () => {
//   const [date, setDate] = useState('');
//   const [turfData, setTurfData] = useState(null);
//   const { id } = useParams();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`http://localhost:3001/turf/${id}`);
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         setTurfData(data);
//       } catch (error) {
//         console.error('Error fetching turf data:', error);
//       }
//     };

//     fetchData();
//   }, [id]);

//   if (!turfData) {
//     return <div>Loading...</div>;
//   }

//   const { name, imageURL, location, facilities, ratePerHour } = turfData;
//   const googleMapsUrl = `https://maps.google.com/maps?q=${name},${name}&z=14&output=embed`;

//   return (
//     <div>
//       <Header />
//       <div className="mt-10 px-4 lg:px-24 flex flex-col md:flex-row items-center justify-center">
//         <div className="mb-8 md:mr-8">
//           <img src={imageURL} alt="Turf" className="h-96" />
//         </div>
//         <div className="mb-8 md:mb-0">
//           <h1 className="text-3xl font-bold mb-4">{name}</h1>
//           <p className="text-lg mb-2">Location: {location}</p>
//           <p className="text-lg mb-2">Facilities: {facilities}</p>
//           <p className="text-lg mb-2">Rate Per Hour: ${ratePerHour}</p>
//         </div>
//         <BookSingleTurf turfId={id} />
//       </div>
//       <div className="mt-8 px-4 lg:px-24">
//         <iframe
//           title="Google Maps"
//           width="100%"
//           height="400"
//           frameBorder="0"
//           scrolling="no"
//           marginHeight="0"
//           marginWidth="0"
//           src={googleMapsUrl}
//         >
//           <a href="https://www.gps.ie/">gps systems</a>
//         </iframe>
//       </div>
//     </div>
//   );
// };

// export default SingleTurf;

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BookSingleTurf from './BookSingleTurf';
import Header from './Header/Header';
import ReviewForm from './ReviewForm';

const SingleTurf = () => {
  const [turfData, setTurfData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

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

    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/reviews/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const reviews = await response.json();
        setReviews(reviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchData();
    fetchReviews();
  }, [id]);

  if (!turfData) {
    return <div>Loading...</div>;
  }

  const { name, imageURL, location, facilities, ratePerHour } = turfData;
  const handleJoinTournament = () => {
    navigate(`tournament`);
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
          <p className="text-lg mb-2">Rate Per Hour: ৳{ratePerHour}</p>
          <button
            onClick={handleJoinTournament}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md mt-4"
          >
            Organize Tournament
          </button>
        </div>
        <BookSingleTurf turfId={id} ratePerHour={ratePerHour} />
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
          src={`https://maps.google.com/maps?q=${name},${name}&z=14&output=embed`}
        >
          <a href="https://www.gps.ie/">gps systems</a>
        </iframe>
      </div>
      <div className="mt-8 px-4 lg:px-24">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        {reviews.map(review => (
          <div key={review._id} className="mb-4">
            <p className="text-lg">
              <strong>{review.user_id.username}</strong>: {review.comment}
            </p>
            <p className="text-sm">Rating: {review.rating}/5</p>
          </div>
        ))}
      </div>
      <ReviewForm turfId={id} />
    </div>
  );
};

export default SingleTurf;
