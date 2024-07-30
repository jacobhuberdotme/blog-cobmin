import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { cookieStorage, createStorage } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { authConnector } from '@web3modal/wagmi'

// Get projectId from https://cloud.walletconnect.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) throw new Error('Project ID is not defined');

const metadata = {
  name: "Cobmin's Stuff",
  description: "Sharing my interests, thoughts, and projects to inspire and help others.",
  url: 'https://cobmin.com', // origin must match your domain & subdomain
  icons: ['https://cobmin.com/blog-images/avatar.png']
}

// Create wagmiConfig
const chains = [mainnet, sepolia] as const;
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  // connectors: [
  //   authConnector({
  //     chains,
  //     options: { projectId },
  //     email: true, // default to true
  //     socials: ['x', 'apple'],
  //     showWallets: true, // default to true
  //     walletFeatures: true // default to true
  //   })
  // ],
  storage: createStorage({
    storage: cookieStorage
  }),
});
