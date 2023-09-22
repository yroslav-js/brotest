"use client"

import {FC, useEffect} from "react";
import AccountBlock from "@/components/screens/account/AccountBlock";
import AccountActivity from "@/components/screens/account/AccountActivity";
import {useRouter} from "next/navigation";
import {useAccount} from "wagmi";

const Account: FC = () => {
  const router = useRouter()
  const {address} = useAccount()

  useEffect(() => {
    if (!address) {
      router.push('/')
    }
  }, [address])

  if (!address) return null

  return (
    <>
      <AccountBlock/>
      <AccountActivity/>
    </>
  );
};

export default Account;