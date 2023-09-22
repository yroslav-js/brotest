"use client"

import {configureChains, createConfig, WagmiConfig} from 'wagmi';
import {
  bscTestnet,
} from 'wagmi/chains';
import {EthereumClient, w3mProvider} from "@web3modal/ethereum";
import {ReactNode} from "react";
import {Web3Modal} from "@web3modal/react";
import {MetaMaskConnector} from "@wagmi/connectors/metaMask";
import {WalletConnectConnector} from "@wagmi/connectors/walletConnect";

const chains = [bscTestnet]
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_ID || ''

const {publicClient} = configureChains(chains, [w3mProvider({projectId})])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({chains}),
    new WalletConnectConnector({
      chains,
      options: {
        projectId
      }
    })
  ],
  publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)

export function WagmiAppConfig({children}: { children: ReactNode }) {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        {children}
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient}/>
    </>
  );
}