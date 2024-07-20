"use client"

import { Inter as FontSans } from 'next/font/google';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import MyNavigationMenu from '@/components/my-navigation-menu';
import MyFooter from '@/components/my-footer-menu';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export default function CommunityCryptoShop() {
  const { address, isConnected } = useAccount();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from your API or database
    fetch('/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

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
          <MyNavigationMenu />
          <main className="flex-grow flex justify-center p-2">
            <div className="w-full max-w-4xl">
              <h1 className="text-4xl font-bold mb-6">Community Crypto Shop</h1>
              {isConnected && <p>Welcome, {address}!</p>}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                {products.map((product: any) => (
                  <div key={product.id} className="border p-4 rounded">
                    <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" />
                    <h2 className="text-xl font-bold">{product.name}</h2>
                    <p>{product.description}</p>
                    <p className="text-lg font-semibold mt-2">{product.price} ETH</p>
                  </div>
                ))}
              </div>
            </div>
          </main>
          <MyFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
