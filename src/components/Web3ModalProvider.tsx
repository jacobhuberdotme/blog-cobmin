// src/context/Web3ModalProvider.ts
'use client';

import React, { ReactNode } from 'react';
import { config, projectId } from '@/config';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { State, WagmiProvider } from 'wagmi';
import { siweConfig } from '@/config/siweConfig';

// Setup queryClient
const queryClient = new QueryClient();

if (!projectId) throw new Error('Project ID is not defined');

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  siweConfig,
  enableAnalytics: true,
  enableOnramp: true,
  themeVariables: {
    '--w3m-color-mix': '#D1C4E9',
    '--w3m-color-mix-strength': 1,
    '--w3m-accent': '#6A0DAD',
  },
});

export default function Web3ModalProvider({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: State;
}) {
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
