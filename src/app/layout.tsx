import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import '@/styles/globals.css';
import { cn } from '@/lib/utils';
import MyNavigationMenu from '@/components/my-navigation-menu';
import { metadata as siteMetadata } from '@/lib/metadata';
import { MDXClientProvider } from '@/components/mdx-provider';
import { ThemeProvider } from '@/components/theme-provider';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = siteMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MyNavigationMenu />
          <MDXClientProvider>
            <div className="flex justify-center p-2">
              <div className="w-full max-w-4xl">{children}</div>
            </div>
          </MDXClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
