import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'

import { cookieStorage, createStorage } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'

// Get projectId from https://cloud.walletconnect.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID

if (!projectId) throw new Error('Project ID is not defined')

const metadata = {
  name: 'CommunityCrypto Shop',
  description: "Welcome to CommunityCrypto Shop, your local marketplace for buying and selling goods using cryptocurrency. Our platform provides a secure and user-friendly environment where community members can post their items for sale and make purchases with ease. Whether you're looking to buy unique items or sell your own, CommunityCrypto Shop bridges the gap between local trading and the digital currency world. Enjoy the convenience of local pickups and the potential for future shipping options, all while engaging in a crypto-powered economy. Join us and become a part of a vibrant community that values both innovation and simplicity.",
  url: 'https://cobmin.com', // origin must match your domain & subdomain
  icons: ['https://cobmin.com/CommunityCryptoShopLogo.png']
}

// Create wagmiConfig
const chains = [mainnet, sepolia] as const
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  }),
})