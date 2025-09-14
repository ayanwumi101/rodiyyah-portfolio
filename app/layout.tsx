import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { Preloader } from '@/components/preloader';
import { Navigation } from '@/components/navigation';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'Arowona - Food, Product & Nature Photography',
  description: 'Professional photography services specializing in food, product, and nature photography',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-background text-foreground font-inter antialiased">
        <Preloader />
        <Navigation />
        {children}
      </body>
    </html>
  );
}