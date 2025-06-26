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
                    className={i < review.rating ? 'fill-current' : 'text-gray-300'}
                  />
                ))}
              </div>
              <p className="text-gray-700 text-sm">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
