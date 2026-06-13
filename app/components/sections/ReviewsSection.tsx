'use client';

import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';

interface Review {
  authorAttribution: {
    displayName: string;
    photoUri?: string;
    uri?: string;
  };
  rating: number;
  text: string;
  relativePublishTimeDescription: string;
  publishTime?: string;
}

interface ReviewsData {
  reviews: Review[];
  rating?: number;
  displayName?: string;
  cached?: boolean;
}

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [overallRating, setOverallRating] = useState<number | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/reviews');

        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }

        const data: ReviewsData = await response.json();
        setReviews(data.reviews || []);
        setOverallRating(data.rating || null);
        setError(null);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError('Unable to load reviews at this time');
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < Math.round(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <section className="w-full bg-gradient-to-b from-blue-50 to-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-900">
            Customer Reviews
          </h2>
          <div className="text-center text-gray-500">Loading reviews...</div>
        </div>
      </section>
    );
  }

  if (error || reviews.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-gradient-to-b from-blue-50 to-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            What Our Customers Say
          </h2>
          {overallRating && (
            <div className="flex flex-col items-center gap-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={24}
                    className={
                      i < Math.round(overallRating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }
                  />
                ))}
              </div>
              <p className="text-lg text-gray-700">
                {overallRating.toFixed(1)} out of 5 stars
              </p>
            </div>
          )}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              {/* Stars */}
              <div className="mb-3">
                {renderStars(review.rating)}
              </div>

              {/* Review Text */}
              <p className="text-gray-700 mb-4 line-clamp-4 text-sm">
                {review.text}
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                {review.authorAttribution.photoUri && (
                  <img
                    src={review.authorAttribution.photoUri}
                    alt={review.authorAttribution.displayName}
                    className="w-10 h-10 rounded-full"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-gray-900 truncate">
                    {review.authorAttribution.displayName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {review.relativePublishTimeDescription}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Google Reviews Link */}
        <div className="text-center mt-12">
          <a
            href="https://www.google.com/maps/place/Sun+Tag+%26+Title"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            View All Reviews on Google
          </a>
        </div>
      </div>
    </section>
  );
}
