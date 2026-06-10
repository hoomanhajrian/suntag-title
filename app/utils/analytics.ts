/**
 * Track phone call conversion for Google Ads
 */
export const trackPhoneCall = () => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'phone_call_click', {
      'event_category': 'engagement',
      'event_label': 'phone_call',
      'phone_number': '(410) 417-8272',
    });
  }
};

/**
 * Track contact form engagement
 */
export const trackContactClick = (type: 'email' | 'phone' | 'directions') => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', `contact_${type}_click`, {
      'event_category': 'engagement',
      'event_label': `contact_${type}`,
    });
  }
};
