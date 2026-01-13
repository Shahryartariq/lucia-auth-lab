import './globals.css';

export const metadata = {
  title: 'lucia auth lab',
  description: 'Next.js Authentication',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
