import type { Metadata } from 'next';
import './globals.css';
import { TermsOverlay } from '@/components/TermsOverlay';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase';
import { SplashScreen } from '@/components/SplashScreen';

export const metadata: Metadata = {
  title: 'Delhi Heroes - Local Legends',
  description: 'Connect. Share. Chat. Good Vibes. Peace. Love.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700;800&family=Lobster&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased selection:bg-primary selection:text-white">
        <FirebaseClientProvider>
          <SplashScreen />
          {children}
          <TermsOverlay />
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
