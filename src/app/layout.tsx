// app/layout.tsx
import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import '@/styles/globals.css';
import { cn } from '@/lib/utils';
import MyNavigationMenu from '@/components/my-navigation-menu';
import { metadata as siteMetadata } from '@/lib/metadata';
import { ThemeProvider } from '@/components/theme-provider';
import MyFooter from '@/components/my-footer-menu';
import Web3ModalProvider from '@/components/Web3ModalProvider';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  ...siteMetadata,
  title: {
    default: "Cobmin's Blog",
    template: '%s | Cobmin',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased flex flex-col',
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Web3ModalProvider>
            <MyNavigationMenu />
            <div className="flex-grow flex justify-center p-2">
              <div className="w-full max-w-4xl">{children}</div>
            </div>
            <MyFooter />
          </Web3ModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
