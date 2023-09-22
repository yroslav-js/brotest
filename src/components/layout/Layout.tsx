import {FC, ReactNode, useEffect} from "react";
import Footer from "@/components/layout/footer/Footer";
import Participate from "@/components/ui/Participate/Participate";
import ConnectModal from "@/components/ui/ConnectModal/ConnectModal";
import {useAccount, useNetwork, useSwitchNetwork} from "wagmi";

import dynamic from "next/dynamic";
import {useAppDispatch, useAppSelector} from "@/hooks/reduxHooks";
import {getCurrentAmountUserTickets, getLottery, getUserLotteries} from "@/redux/features/lotterySlice";

const Header = dynamic(() => import('./header/Header'), {ssr: false})

const Layout: FC<{ children: ReactNode }> = ({children}) => {
  const {isConnected, address} = useAccount()
  const {chain} = useNetwork()
  const {switchNetwork} = useSwitchNetwork()
  const dispatch = useAppDispatch()
  const currentRound = useAppSelector(state => state.contractSlice.contractData.currentId)

  useEffect(() => {
    if (currentRound) {
      dispatch(getLottery(Number(currentRound)))
      dispatch(getCurrentAmountUserTickets({
        id: Number(currentRound),
        address: address || '0x0000000000000000000000000000000000000000'
      }))
    }
  }, [currentRound])

  useEffect(() => {
    if (address) dispatch(getUserLotteries(address))
  }, [address])

  useEffect(() => {
    if (isConnected && chain?.id !== 97) switchNetwork?.(97)
  }, [isConnected])

  return (
    <>
      <Header/>
      {children}
      <Footer/>
      <ConnectModal/>
      <Participate/>
    </>
  );
};

export default Layout;