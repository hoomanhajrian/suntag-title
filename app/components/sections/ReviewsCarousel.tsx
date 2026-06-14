'use client';

import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import Image from 'next/image';

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
  totalReviews?: number;
}

export default function ReviewsCarousel() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
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
            className={i < Math.round(rating) ? 'fill-gold-base text-gold-base' : 'text-gray-300'}
          />
        ))}
      </div>
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  // Auto-advance carousel
  useEffect(() => {
    if (reviews.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 6000); // Change slide every 6 seconds

    return () => clearInterval(timer);
  }, [reviews.length, currentIndex]);

  if (loading || error || reviews.length === 0) {
    return null;
  }

  const currentReview = reviews[currentIndex];

  return (
    <section className="bg-background px-6 pb-16 md:pb-24">
      <div className="max-w-4xl mx-auto">
        {/* Header with Stats */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-base mb-6">
            Trusted by Our Community
          </h2>
          
          {/* Overall Rating Display */}
          {overallRating && (
            <div className="flex flex-col items-center gap-3 mb-8">
              <div className="flex gap-1 justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={24}
                    className={i < Math.round(overallRating) ? 'fill-gold-base text-gold-base' : 'text-gray-300'}
                  />
                ))}
              </div>
              <p className="text-lg font-semibold text-text-base">
                {overallRating.toFixed(1)} out of 5 stars
              </p>
              <p className="text-sm text-text-base/60">
                Based on {reviews.length}+ verified customer reviews
              </p>
            </div>
          )}
          <p className="text-text-base/70">
            See what our satisfied customers have to say about us
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Review Card */}
          <div className="bg-white/5 border border-gold-base/30 rounded-lg shadow-[0_0_15px_rgba(255,192,64,0.1)] p-6 sm:p-8 md:p-12 min-h-[300px] flex flex-col justify-between relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-gold-base/10 rounded-full blur-3xl pointer-events-none" />

            {/* Stars and Rating */}
            <div className="mb-6">
              {renderStars(currentReview.rating)}
            </div>

            {/* Review Text */}
            <p className="text-text-base text-lg md:text-xl leading-relaxed mb-8 flex-1 italic font-light">
              "{currentReview.text}"
            </p>

            {/* Author Info */}
            <div className="flex items-center gap-4 pt-6 border-t border-gold-base/20">
              {currentReview.authorAttribution.photoUri ? (
                <Image
                  src={currentReview.authorAttribution.photoUri}
                  alt={currentReview.authorAttribution.displayName}
                  width={56}
                  height={56}
                  className="rounded-full object-cover border border-gold-base/50"
                  unoptimized
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-gold-base/20 flex items-center justify-center border border-gold-base/50 text-gold-base font-bold text-xl">
                  {currentReview.authorAttribution.displayName.charAt(0)}
                </div>
              )}
              <div>
                <p className="font-semibold text-text-base">
                  {currentReview.authorAttribution.displayName}
                </p>
                <p className="text-sm text-text-base/60">
                  {currentReview.relativePublishTimeDescription}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 gap-4">
            {/* Left Button */}
            <button
              onClick={prevSlide}
              className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-gold-base hover:bg-gold-base hover:text-background text-gold-base transition-all duration-300 shrink-0"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* Indicators */}
            <div className="flex gap-1.5 md:gap-2 flex-wrap justify-center">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-gold-base w-6 md:w-8'
                      : 'bg-gold-base/30 w-2 hover:bg-gold-base/60'
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>

            {/* Right Button */}
            <button
              onClick={nextSlide}
              className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-gold-base hover:bg-gold-base hover:text-background text-gold-base transition-all duration-300 shrink-0"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>

          {/* Review Counter */}
          <p className="text-center text-text-base/50 text-sm mt-6">
            Review {currentIndex + 1} of {reviews.length}
          </p>
        </div>

        {/* Google Reviews Link */}
        <div className="text-center mt-12">
          <a
            href="https://search.google.com/local/reviews?placeid=ChIJ1xAxzwshyIkR5itm3CQaYHg"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 md:px-8 py-3 bg-gold-base text-background text-sm md:text-base font-semibold uppercase tracking-wider rounded-sm hover:bg-gold-light transition-colors duration-200 mb-6"
          >
            View All Reviews on Google
          </a>
          
          {/* Google Attribution (Required by ToS) */}
          <div className="flex items-center justify-center gap-2 text-xs text-text-base/50 pt-6 border-t border-gold-shadow">
            <span>Reviews powered by</span>
            <svg
              viewBox="0 0 24 24"
              width="60"
              height="20"
              fill="none"
              className="opacity-60"
            >
              <text x="0" y="16" fontSize="14" fontWeight="600" fill="currentColor">
                Google
              </text>
            </svg>
            <span className="text-[10px]">
              Google and the Google logo are trademarks of Google LLC
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
