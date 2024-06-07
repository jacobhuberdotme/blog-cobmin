"use client";

import { MDXProvider } from '@mdx-js/react';
import { useMDXComponents } from '@/mdx-components';

export const MDXClientProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <MDXProvider components={useMDXComponents({})}>
      {children}
    </MDXProvider>
  );
};
