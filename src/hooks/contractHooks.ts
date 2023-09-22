"use client"

import {useAccount, useContractReads, useContractWrite, usePrepareContractWrite, useWaitForTransaction} from "wagmi";
import {LOTTERY_ADDRESS, TOKEN_ADDRESS} from "@/contract/config";
import lotteryAbi from "@/contract/lotteryAbi";
import {contractItems, contractUserItems, PriceType} from "@/redux/features/contractSlice";
import tokenAbi from "@/contract/tokenAbi";
import {parseEther} from "viem";

const lotteryContract = {address: LOTTERY_ADDRESS, abi: lotteryAbi}

const abiFunctionsToRead = ['price', 'currentTickets', 'maxTicketsForWallet', 'maxTickets', 'currentId', 'endDate', 'minForClaim']

const lotteryFunctionsToRead = (functionName: string): any => ({...lotteryContract, functionName})

export const useLotteryContractRead = () => {
  const {data, isError, isLoading, isSuccess} = useContractReads({
    contracts: abiFunctionsToRead?.map(name => lotteryFunctionsToRead(name)),
  })

  const results = {...contractItems}

  data?.forEach((result, index) => {
    results[`${abiFunctionsToRead[index]}` as keyof typeof results] = result.result as PriceType
  })

  return {data: results, isError, isLoading, isSuccess}
}

const abiUserFunctionsToRead = ['walletToRefferalReward', 'walletToCountRefferal', 'walletToRefferalRewardForClaim']

const userFunctionsToRead = (functionName: string, arg: `0x${string}` | undefined): any => ({
  ...lotteryContract,
  functionName,
  args: [arg]
})

export const useUserContractRead = (arg: `0x${string}` | undefined) => {
  const {data, isError, isLoading, isSuccess} = useContractReads({
    contracts: abiUserFunctionsToRead?.map(name => userFunctionsToRead(name, arg)),
    enabled: Boolean(arg)
  })

  const results = {...contractUserItems}

  data?.forEach((result, index) => {
    results[`${abiUserFunctionsToRead[index]}` as keyof typeof results] = result.result as PriceType
  })

  return {data: results, isError, isLoading, isSuccess}
}

export const useBuyTickets = (amount: number = 0, debouncedAmount: number, price: number = 0) => {
  const ref = (typeof window !== "undefined" && localStorage.getItem('ref')) || '0x0000000000000000000000000000000000000000'
  const {data: hashData, write: approve, isError: err1} = useContractWrite({
    address: TOKEN_ADDRESS,
    abi: tokenAbi,
    functionName: 'approve',
    args: [LOTTERY_ADDRESS, parseEther((((price / 10 ** 18) * 1.1) * amount).toString())],
    chainId: 97
  })

  const {isSuccess: isFinish, data: d, isError: err4} = useWaitForTransaction({
    hash: hashData?.hash,
  })

  const {data, isLoading, write, isError: err2} = useContractWrite({
    address: LOTTERY_ADDRESS,
    abi: lotteryAbi,
    functionName: 'buyTickets',
    args: [amount, ref],
    chainId: 97
  })

  const {isSuccess, isError: err3} = useWaitForTransaction({
    hash: data?.hash
  })

  return {data, isSuccess, isLoading, write, approve, isFinish, hashData, isError: err1 || err2 || err3 || err4}
}