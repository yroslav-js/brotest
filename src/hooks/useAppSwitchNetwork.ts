import {useNetwork, useSwitchNetwork} from "wagmi";
import {useEffect} from "react";
import {useAppDispatch} from "@/hooks/reduxHooks";
import {setIsModalOpen} from "@/redux/features/contractSlice";

const useAppSwitchNetwork = () => {
  const {switchNetwork} = useSwitchNetwork()
  const {chain} = useNetwork()
  const dispatch = useAppDispatch()

  const checkNetwork = () => {
    if (chain?.id === 97) return
    else if (chain?.id && chain.id !== 97) switchNetwork?.(97)
    else {
      dispatch(setIsModalOpen([false, 'participate']))
      dispatch(setIsModalOpen([true, 'connect']))
    }
  }

  return checkNetwork
}

export default useAppSwitchNetwork