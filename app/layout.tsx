import { inter } from '@/ui/fonts';
import '@/ui/globals.css';
import { ThemeProvider } from '@/ui/components/theme-provider';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Buckets',
  description: 'a version of this simple app utilizing nextjs',
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`antialiased ${inter.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >

          {children}

        </ThemeProvider>
      </body>
    </html>
  );
}
