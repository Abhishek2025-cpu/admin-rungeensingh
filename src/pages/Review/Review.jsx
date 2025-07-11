// userList bnani h isko , all users will display

import React from 'react';
import { FaUserCircle, FaStar } from 'react-icons/fa';

const Reviews = () => {
  // Example static review data — replace with API data as needed
  const reviews = [
    {
      id: 1,
      user: 'Ravi Kumar',
      rating: 4,
      comment: 'Excellent read! Insightful and practical tips throughout.',
    },
    {
      id: 2,
      user: 'Ayesha Singh',
      rating: 5,
      comment: 'Truly inspiring. Loved the writing style and clarity.',
    },
    {
      id: 3,
      user: 'Imran Sheikh',
      rating: 3,
      comment: 'Good overall, but a bit repetitive in some sections.',
    },

  {
    id:3,
    user:'Headher ',
    rating:4,
    comment:'Impressive',
  }
  ];
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="w-full bg-white rounded-xl shadow-md px-8 py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <FaStar className="text-yellow-500" /> Book Reviews
        </h2>

        <div className="space-y-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-3 mb-2">
                <FaUserCircle className="text-gray-500" size={24} />
                <span className="font-medium text-gray-800">{review.user}</span>
              </div>
              <div className="flex items-center text-yellow-500 text-sm mb-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={i <review.rating ? 'fill-current' :'text-gray-300'}
                  />
                ))}
              </div>
              <p className ="text-gray-700 text-sm">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;

// import React, { useEffect, useState } from 'react';
// import { FaUserCircle, FaStar } from 'react-icons/fa';

// const Reviews = () => {
//   const [reviews, setReviews] = useState([]);
//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState('');
//   const [user, setUser] = useState('');

//   const bookId = '684bea04b8412cd9e1036449';

//   // 🔹 Fetch reviews (assuming API supports fetching)
//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const res = await fetch(`https://rungeenbooks.onrender.com/api/book/rate/${bookId}`);
//         const data = await res.json();
//         console.log('Fetched reviews:', data);
//         setReviews(data);
//       } catch (err) {
//         console.error('Failed to fetch reviews:', err);
//       }
//     };

//     fetchReviews();
//   }, [bookId]);

//   // 🔹 Submit a review
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch(`https://rungeenbooks.onrender.com/api/book/rate/${bookId}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           user,
//           rating,
//           comment,
//         }),
//       });

//       if (res.ok) {
//         const newReview = await res.json();
//         setReviews((prev) => [...prev, newReview]);
//         setUser('');
//         setRating(0);
//         setComment('');
//         alert('Review submitted successfully!');
//       } else {
//         alert('Failed to submit review');
//       }
//     } catch (err) {
//       console.error('Error submitting review:', err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 px-6 py-8">
//       <div className="w-full bg-white rounded-xl shadow-md px-8 py-10">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
//           <FaStar className="text-yellow-500" /> Book Reviews
//         </h2>

//         <form onSubmit={handleSubmit} className="mb-8 space-y-4">
//           <input
//             type="text"
//             placeholder="Your Name"
//             value={user}
//             onChange={(e) => setUser(e.target.value)}
//             className="w-full px-4 py-2 border rounded-md text-sm"
//             required
//           />

//           <textarea
//             placeholder="Write your review..."
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//             rows="3"
//             className="w-full px-4 py-2 border rounded-md text-sm"
//             required
//           />

//           <div className="flex items-center gap-2">
//             <span className="text-sm font-medium text-gray-700">Rating:</span>
//             {[...Array(5)].map((_, i) => (
//               <FaStar
//                 key={i}
//                 onClick={() => setRating(i + 1)}
//                 className={`cursor-pointer ${i < rating ? 'text-yellow-500' : 'text-gray-300'}`}
//               />
//             ))}
//           </div>

//           <button
//             type="submit"
//             className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-sm font-medium"
//           >
//             Submit Review
//           </button>
//         </form>

//         <div className="space-y-6">
//           {reviews.map((review, idx) => (
//             <div
//               key={idx}
//               className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
//             >
//               <div className="flex items-center gap-3 mb-2">
//                 <FaUserCircle className="text-gray-500" size={24} />
//                 <span className="font-medium text-gray-800">{review.user || 'Anonymous'}</span>
//               </div>
//               <div className="flex items-center text-yellow-500 text-sm mb-2">
//                 {[...Array(5)].map((_, i) => (
//                   <FaStar
//                     key={i}
//                     className={i < review.rating ? 'fill-current' : 'text-gray-300'}
//                   />
//                 ))}
//               </div>
//               <p className="text-gray-700 text-sm">{review.comment}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Reviews;
