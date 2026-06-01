import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/tracking',
      },
      {
        userAgent: 'AdsBot-Google',
        allow: '/',
        disallow: '/tracking',
      },
      {
        userAgent: 'AdsBot-Google-Mobile',
        allow: '/',
        disallow: '/tracking',
      },
    ],
    sitemap: [
      'https://www.suntagandtitle.com/sitemap.xml',
      'https://suntagandtitle.com/sitemap.xml',
    ],
  };
}
