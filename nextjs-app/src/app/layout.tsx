import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './ui/globals.css';
import { SearchProvider } from '@/contexts/SearchContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BrickBro challenge',
  description: 'Geolocation with Google Maps API',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <SearchProvider>{children}</SearchProvider>
      </body>
    </html>
  );
}
