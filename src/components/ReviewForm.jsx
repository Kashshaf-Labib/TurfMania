// import React, { useState } from 'react';
// import axios from 'axios';

// const ReviewForm = ({ turfId }) => {
//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const user = localStorage.getItem('user');
//     const userId = JSON.parse(user)._id;

//     try {
//       await axios.post('http://localhost:3001/api/reviews', {
//         user_id: userId,
//         turf_id: turfId,
//         rating,
//         comment,
//       });

//       setRating(0);
//       setComment('');
//       alert('Review submitted successfully');
//     } catch (error) {
//       console.error('Error submitting review:', error);
//       alert('Error submitting review. Please try again.');
//     }
//   };

//   return (
//     <div className="mt-8 px-4 lg:px-24">
//       <h2 className="text-2xl font-bold mb-4">Leave a Review</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block text-lg mb-2">Rating</label>
//           <select
//             value={rating}
//             onChange={(e) => setRating(e.target.value)}
//             className="block w-full px-4 py-2 border rounded"
//           >
//             <option value="0">Select Rating</option>
//             <option value="1">1 - Poor</option>
//             <option value="2">2 - Fair</option>
//             <option value="3">3 - Good</option>
//             <option value="4">4 - Very Good</option>
//             <option value="5">5 - Excellent</option>
//           </select>
//         </div>
//         <div className="mb-4">
//           <label className="block text-lg mb-2">Comment</label>
//           <textarea
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//             className="block w-full px-4 py-2 border rounded"
//           ></textarea>
//         </div>
//         <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit Review</button>
//       </form>
//     </div>
//   );
// };

// export default ReviewForm;


import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const ReviewForm = ({ turfId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const user = localStorage.getItem('user');
    if (!user) {
      setError('User not logged in.');
      setLoading(false);
      return;
    }

    const userId = JSON.parse(user)._id;

    try {
      await axios.post('http://localhost:3001/api/reviews', {
        user_id: userId,
        turf_id: turfId,
        rating,
        comment,
      });

      setRating(0);
      setComment('');
      setSuccess('Review submitted successfully');
    } catch (error) {
      console.error('Error submitting review:', error);
      setError('Error submitting review. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 px-4 lg:px-24 pb-10">
      <h2 className="text-2xl font-bold mb-4">Leave a Review</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-lg mb-2">Rating</label>
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="block w-full px-4 py-2 border rounded"
          >
            <option value="0">Select Rating</option>
            <option value="1">1 - Poor</option>
            <option value="2">2 - Fair</option>
            <option value="3">3 - Good</option>
            <option value="4">4 - Very Good</option>
            <option value="5">5 - Excellent</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-lg mb-2">Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="block w-full px-4 py-2 border rounded"
          ></textarea>
        </div>
        {loading && <p className="text-blue-500">Submitting your review...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
          Submit Review
        </button>
      </form>
    </div>
  );
};

ReviewForm.propTypes = {
  turfId: PropTypes.string.isRequired,
};

export default ReviewForm;

