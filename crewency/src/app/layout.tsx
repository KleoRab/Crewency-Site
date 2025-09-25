import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Crewency - AI-Powered Social Media Manager',
  description: 'A modular SaaS platform for managing social media with AI-powered content generation and scheduling.',
  keywords: 'social media, management, AI, scheduling, analytics, SaaS',
  authors: [{ name: 'Crewency Team' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}