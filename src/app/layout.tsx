import type { Metadata } from 'next';
import { Playfair_Display, Space_Grotesk, Inter, DM_Mono } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
});
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
});
const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
});
const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-dm-mono',
});

export const metadata: Metadata = {
  title: 'Brandcure — Visual Engineering & Digital Excellence',
  description:
    'We partner with ambitious startups and enterprises to build premium digital experiences. AI Ads, AI UGC, Web Design, Branding.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${spaceGrotesk.variable} ${inter.variable} ${dmMono.variable}`}
        style={{
          fontFamily: 'var(--ff-body)',
          background: 'var(--bg)',
          color: 'var(--fg)',
          overflowX: 'hidden',
          cursor: 'none',
        }}
      >
        {children}
      </body>
    </html>
  );
}
