import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface GoogleReview {
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

interface GooglePlacesResponse {
  reviews?: GoogleReview[];
  rating?: number;
  displayName?: string;
  userRatingCount?: number;
}

interface CachedData {
  reviews: GoogleReview[];
  rating: number | null;
  displayName: string | null;
  timestamp: number;
}

const OFFLINE_FALLBACK = {
  reviews: [
    {
      authorAttribution: {
        displayName: "Rozie S",
        photoUri: "https://lh3.googleusercontent.com/a-/ALV-UjVY6ZdKH2j7cboiBRyuPAHMuy1v0mYtPNM6UnTFD-2O0G25X__ERQ=s128-c0x00000000-cc-rp-mo-ba4",
        uri: "https://www.google.com/maps/contrib/106790367459002347109/reviews"
      },
      rating: 5,
      text: "Great experience from start to finish. Amir, the owner, is super friendly and easy to work with. He made the whole tag and title process quick, smooth, and stress-free. Everything was explained clearly and handled efficiently. Highly recommend if you want fast, reliable service with a personal touch.",
      relativePublishTimeDescription: "4 months ago",
      publishTime: "2026-01-28T20:34:15.447436421Z"
    },
    {
      authorAttribution: {
        displayName: "m esfahani",
        photoUri: "https://lh3.googleusercontent.com/a/ACg8ocIsOSreNsaAd7_7SVU9Bkdlygld7QvVgEJ5TjjGIHJBII1GZA=s128-c0x00000000-cc-rp-mo",
        uri: "https://www.google.com/maps/contrib/102410820549159931103/reviews"
      },
      rating: 5,
      text: "Amir assists customers with the vehicle title transfer process, ensuring a smooth and accurate change of ownership. He helps verify that titles are properly signed, completes all required paperwork, and submits documents to the Maryland Department of Transportation (MDOT) or Maryland Motor Vehicle Administration (MVA).",
      relativePublishTimeDescription: "4 months ago",
      publishTime: "2026-02-02T03:01:36.215479726Z"
    },
    {
      authorAttribution: {
        displayName: "yaye Fall",
        photoUri: "https://lh3.googleusercontent.com/a-/ALV-UjXtr_dwVnTXxCXpt_TIFlvVKDaDnQDBrDa1cCuIMIYd2lWvkFdb=s128-c0x00000000-cc-rp-mo",
        uri: "https://www.google.com/maps/contrib/103440197389503510978/reviews"
      },
      rating: 5,
      text: "Fast and convenient tag and title service. The staff is knowledgeable and helps navigate the sometimes confusing Maryland MVA rules effortlessly. I was in and out in less than 20 minutes with my new plates.",
      relativePublishTimeDescription: "6 months ago",
      publishTime: "2025-11-15T14:22:10.000Z"
    }
  ],
  rating: 4.8,
  displayName: "SUN TAG AND TITLE",
  userRatingCount: 40
};

// Cache duration: 7 days (to minimize API calls and costs)
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
const CACHE_FILE = path.join(process.cwd(), '.cache', 'reviews.json');

// Ensure cache directory exists
function ensureCacheDir() {
  const cacheDir = path.dirname(CACHE_FILE);
  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, { recursive: true });
  }
}

// Read cache from file
function getCache(): CachedData | null {
  try {
    ensureCacheDir();
    if (fs.existsSync(CACHE_FILE)) {
      const cached = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8')) as CachedData;
      if (Date.now() - cached.timestamp < CACHE_DURATION) {
        return cached;
      }
    }
  } catch (error) {
    console.error('Error reading cache:', error);
  }
  return null;
}

// Write cache to file
function setCache(data: CachedData) {
  try {
    ensureCacheDir();
    fs.writeFileSync(CACHE_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing cache:', error);
  }
}

export async function GET(req: NextRequest) {
  try {
    // Check file-based cache first
    const cachedData = getCache();
    if (cachedData) {
      console.log('[Reviews API] Serving from cache');
      return NextResponse.json({
        reviews: cachedData.reviews,
        rating: cachedData.rating,
        displayName: cachedData.displayName,
        cached: true,
        cacheAge: Date.now() - cachedData.timestamp,
      });
    }

    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    const placeId = process.env.GOOGLE_PLACES_ID;

    if (!apiKey || !placeId) {
      console.error('[Reviews API] Missing API credentials');
      return NextResponse.json(
        { error: 'Missing Google Places API credentials' },
        { status: 500 }
      );
    }

    // Google Places API v1 endpoint — returns up to 10 most recent reviews
    const url = `https://places.googleapis.com/v1/places/${placeId}?fields=reviews,rating,displayName,userRatingCount&key=${apiKey}`;

    console.log('[Reviews API] Fetching from Google Places API...');
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Referer': 'https://www.suntagandtitle.com',
      },
    });

    if (!response.ok) {
      console.error('[Reviews API] Google API error:', response.statusText);
      // Return cached data as fallback if available
      const fallbackCache = getCache();
      if (fallbackCache) {
        return NextResponse.json({
          reviews: fallbackCache.reviews,
          rating: fallbackCache.rating,
          displayName: fallbackCache.displayName,
          cached: true,
          error: 'Serving stale cache due to API error',
        });
      }
      
      // Return offline fallback if no cache
      console.log('[Reviews API] Serving OFFLINE_FALLBACK due to API error and no cache');
      return NextResponse.json({
        ...OFFLINE_FALLBACK,
        cached: true,
        error: 'Serving offline fallback due to API error'
      });
    }

    const rawData = await response.json();

    // Map the raw data to match our interface since 'text' and 'displayName' are objects in the Places API response
    const mappedReviews = (rawData.reviews || []).map((review: any) => ({
      authorAttribution: review.authorAttribution,
      rating: review.rating,
      text: review.text?.text || '',
      relativePublishTimeDescription: review.relativePublishTimeDescription,
      publishTime: review.publishTime
    }));

    const displayName = rawData.displayName?.text || null;

    // Save to cache
    const cacheData: CachedData = {
      reviews: mappedReviews,
      rating: rawData.rating || null,
      displayName: displayName,
      timestamp: Date.now(),
    };
    setCache(cacheData);

    return NextResponse.json({
      reviews: mappedReviews,
      rating: rawData.rating || null,
      displayName: displayName,
      userRatingCount: rawData.userRatingCount || mappedReviews.length || 0,
      cached: false,
    });
  } catch (error) {
    console.error('[Reviews API] Error:', error);
    
    // Try to serve stale cache as fallback
    const fallbackCache = getCache();
    if (fallbackCache) {
      return NextResponse.json({
        reviews: fallbackCache.reviews,
        rating: fallbackCache.rating,
        displayName: fallbackCache.displayName,
        cached: true,
        error: 'Serving stale cache due to error',
      });
    }

    // Return offline fallback if no cache
    console.log('[Reviews API] Serving OFFLINE_FALLBACK due to error and no cache');
    return NextResponse.json({
      ...OFFLINE_FALLBACK,
      cached: true,
      error: 'Serving offline fallback due to error'
    });
  }
}
