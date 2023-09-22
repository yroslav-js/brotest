"use client"

import {Provider} from "react-redux";
import {store} from "@/redux/store";
import {ReactNode, useEffect} from "react";
import Layout from "@/components/layout/Layout";
import {useAppDispatch, useAppSelector} from "@/hooks/reduxHooks";
import {setContractData, setUserData} from "@/redux/features/contractSlice";
import {useLotteryContractRead, useUserContractRead} from "@/hooks/contractHooks";
import {useAccount} from "wagmi";

function LayoutProvider({children}: { children: ReactNode }) {
  const {address} = useAccount()
  const dispatch = useAppDispatch()
  const refetch = useAppSelector(state => state.contractSlice.refetch)
  const {data, isLoading} = useLotteryContractRead()
  const {data: userData, isLoading: userIsLoading} = useUserContractRead(address)

  useEffect(() => {
    if (!isLoading) dispatch(setContractData(data))
  }, [isLoading && refetch])

  useEffect(() => {
    console.log(userData)
    dispatch(setUserData(userData))
  }, [userIsLoading && refetch])

  return (
    <Layout>
      {children}
    </Layout>
  )
}

export function Providers({children}: { children: ReactNode }) {
  return <Provider store={store}>
    <LayoutProvider>
      {children}
    </LayoutProvider>
  </Provider>;
}