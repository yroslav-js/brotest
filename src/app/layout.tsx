import './globals.css'
import type {Metadata} from 'next'
import localFont from 'next/font/local'
import {Providers} from "@/redux/provider";
import {WagmiAppConfig} from "@/components/layout/WagmiAppConfig";

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'Bro2Bro.com - fair game based on a fully decentralised smart contract',
  description: 'Absolutely everyone has a chance to win. The decentralised smart contract makes all processes transparent and fully automated!',
  keywords: 'fair game, crypto game, crypto lottery, crypto',
  twitter: {
    site: 'https://www.bro2bro.com/',
    creator: 'Bro2Bro',
    title: 'Bro2Bro.com - fair game based on a fully decentralised smart contract',
    description: 'Absolutely everyone has a chance to win. The decentralised smart contract makes all processes transparent and fully automated!'
  },
  openGraph: {
    url: 'https://www.bro2bro.com/',
    title: 'Bro2Bro.com - fair game based on a fully decentralised smart contract',
    description: 'Absolutely everyone has a chance to win. The decentralised smart contract makes all processes transparent and fully automated!'
  }
}

const myFont = localFont({
  src: './roc-grotesk.woff2',
  display: 'auto',
  variable: '--roc-grotesk'
})

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={myFont.className}>
    <body>
    <WagmiAppConfig>
      <Providers>
        {children}
      </Providers>
    </WagmiAppConfig>
    </body>
    </html>
  )
}
