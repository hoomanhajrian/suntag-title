# Google Places API Setup Guide

## Overview
Your site now fetches real customer reviews from Google Places and displays them on the homepage. Follow these steps to set up the API credentials.

## Step 1: Get Google Places API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Places API**:
   - Click "APIs & Services" → "Library"
   - Search for "Places API"
   - Click "Enable"
4. Create credentials:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "API Key"
   - Copy the API key

## Step 2: Find Your Google Place ID

Your business should already have a Google Business profile. To find your Place ID:

### Option A: Using Google Maps
1. Go to [Google Maps](https://maps.google.com/)
2. Search for your business: "Sun Tag & Title, Columbia, MD"
3. When you find it, look at the URL. The Place ID is in the URL after `place/`:
   ```
   https://maps.app.goo.gl/...
   ```
4. Or use the [Google Places API Place Details Finder](https://mapsplatform.google.com/apis-and-services/place-id-finder)

### Option B: Using Text Search
Run this in your browser console (replace with your business info):
```javascript
const apiKey = 'YOUR_API_KEY';
fetch(`https://places.googleapis.com/v1/places:searchText`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    textQuery: 'Sun Tag & Title Columbia MD'
  })
})
.then(r => r.json())
.then(data => console.log(data.places[0].name))
```

## Step 3: Add Credentials to .env.local

Update `/workspaces/suntag-title/.env.local`:

```
GOOGLE_PLACES_API_KEY=YOUR_API_KEY_HERE
GOOGLE_PLACES_ID=YOUR_PLACE_ID_HERE
```

## Step 4: Test It

1. Restart your development server
2. Visit your homepage
3. Scroll down to see the "What Our Customers Say" section with reviews

## Important Notes

- **API Rate Limits**: Google Places API has quota limits. The code caches reviews for 24 hours to minimize API calls.
- **Review Count**: The API returns up to 10 most recent reviews by default.
- **Ratings**: Only 5-star ratings are displayed alongside review text.
- **Images**: Reviewer profile images are displayed if available.
- **Link**: A button links to your full Google Business profile for more reviews.

## Troubleshooting

### No reviews showing?
- Check that `GOOGLE_PLACES_API_KEY` and `GOOGLE_PLACES_ID` are correctly set in `.env.local`
- Verify your business has reviews on Google
- Check browser console for error messages

### "Missing Google Places API credentials" error?
- Ensure both environment variables are set
- Restart your dev server after updating `.env.local`

### API errors?
- Verify API is enabled in Google Cloud Console
- Check that API key has Places API permissions
- Ensure Place ID is correct

## Component Features

- **Responsive grid**: 1 column on mobile, 2 on tablet, 3 on desktop
- **Star ratings**: Visual 5-star display for each review
- **Overall rating**: Shows business average rating
- **Caching**: 24-hour cache to avoid excessive API calls
- **Fallback**: Section doesn't show if no reviews available
- **Loading state**: Graceful loading indicator
- **Google link**: Direct link to full Google Business profile
