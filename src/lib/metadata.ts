// metadata.ts

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Cobmin's Blog",
  description: "Sharing my interests, thoughts, and projects to inspire and help others.",
  keywords: ["blog", "technology", "blockchain", "AI", "philosophy", "Loopring", "Taiko"],
  openGraph: {
    type: 'website',
    title: "Cobmin's Blog",
    description: "Sharing my interests, thoughts, and projects to inspire and help others.",
    locale: 'en_IE',
    url: 'https://www.cobmin.com/',
    siteName: "Cobmin's Blog",
    images: [
      {
        url: 'https://www.cobmin.com/og-image.jpg',
        width: 800,
        height: 600,
        alt: 'Og Image Alt',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: 'https://www.cobmin.com/',
    creator: '@cobmin',
    title: "Cobmin's Blog",
    description: "Sharing my interests, thoughts, and projects to inspire and help others.",
    images: [
      {
        url: 'https://www.cobmin.com/og-image.jpg',
        width: 800,
        height: 600,
        alt: 'Og Image Alt',
      },
    ],
  },
  robots: 'index, follow',
};
