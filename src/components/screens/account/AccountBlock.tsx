"use client"

import {FC, useEffect, useState} from "react";
import '../../assets/styles/mainBlock.scss'
import styles from './Account.module.scss'
import clsx from "clsx";
import ParticipateButton from "@/components/ui/Participate/ParticipateButton";
import {useAppDispatch, useAppSelector} from "@/hooks/reduxHooks";
import {useAccount, useContractWrite, useWaitForTransaction} from "wagmi";
import Button from "@/components/ui/Button/Button";
import {LOTTERY_ADDRESS} from "@/contract/config";
import lotteryAbi from "@/contract/lotteryAbi";
import useAppSwitchNetwork from "@/hooks/useAppSwitchNetwork";
import {setRefetch} from "@/redux/features/contractSlice";
import {Oval} from "react-loader-spinner";

const AccountBlock: FC = () => {
  const {address} = useAccount()
  const userData = useAppSelector(state => state.lotterySlice.user)
  const minForClaim = useAppSelector(state => state.contractSlice.contractData.minForClaim)
  const userContractData = useAppSelector(state => state.contractSlice.userData)
  const dispatch = useAppDispatch()
  const checkNetwork = useAppSwitchNetwork()
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const {data, write, isError: error} = useContractWrite({
    address: LOTTERY_ADDRESS,
    abi: lotteryAbi,
    functionName: 'claimReward',
    chainId: 97
  })

  const {isSuccess, isError} = useWaitForTransaction({
    hash: data?.hash
  })

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        dispatch(setRefetch(true))
        setLoading(false)
      }, 10000)
      setTimeout(() => {
        dispatch(setRefetch(true))
      }, 5000)
    }
    if (isError || error) setLoading(false)
  }, [isSuccess, isError, error])

  useEffect(() => {
    const cleanUp = setTimeout(() => {
      setCopied(false)
    }, 2000)

    return () => {
      clearTimeout(cleanUp)
    }
  }, [copied])

  return (
    <div className={clsx("block container", styles.account)}>
      <div>
        <div className="heading heading--size-b">Your account</div>
        <div className={clsx("desc-block", styles.descBlock)}>
          <p>
            So far you have participated in
            <span className="green"> {userData?.lotteries?.length || 0}</span> rounds, in which you have purchased
            <span className="green"> {userData?.tickets?.length || 0}</span> tickets.
          </p>
          <p>
            Referral link: <span
            onClick={() => {
              // navigator.clipboard.writeText(`https://bro2bro.vercel.app/ref/${address}`)
              navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_REF_TO_LOCALSTORAGE}/ref/${address}`)
              setCopied(true)
            }}
            className={styles.green}>{copied ? "COPIED" : "COPY"}</span>, referrals: <span
            className="green">{Number(userContractData.walletToCountRefferal || 0)}</span>,
            <br/>
            reward: <span
            className="green">{Math.round(Number(userContractData.walletToRefferalReward || 0) / 10 ** 18)}$</span>, to
            claim: <span
            className="green">{Math.round(Number(userContractData.walletToRefferalRewardForClaim || 0) / 10 ** 18)}$/{Math.round(Number(minForClaim) / 10 ** 18)}$</span>.
          </p>
          <p>
            You have a high chance of winning, and winning is impossible without
            taking part!
          </p>
        </div>
        <ParticipateButton>Buy tickets</ParticipateButton>
        <div className={styles.buttonWrapper}>
          <div style={{position: "relative"}}>
            {loading &&
              <Oval
                height={50}
                width={50}
                color="#77ef8b"
                wrapperStyle={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  display: 'inline-block',
                  zIndex: '1'
                }}
                ariaLabel='loading-indicator'
                secondaryColor="rgba(0, 0, 0, .4)"
                strokeWidth={4}
                strokeWidthSecondary={4}
              />
            }
            <div
              style={loading || Number(minForClaim) > Number(userContractData.walletToRefferalRewardForClaim) ? {
                opacity: .4,
                cursor: 'default'
              } : {}}>
              <Button
                style={Number(minForClaim) > Number(userContractData.walletToRefferalRewardForClaim) ? {cursor: 'default'} : {}}
                onClick={() => {
                  if (!loading && Number(minForClaim) <= Number(userContractData.walletToRefferalRewardForClaim)) {
                    setLoading(true)
                    checkNetwork()
                    write()
                  }
                }} filled='filled'>Claim</Button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.account__animation}>
        <object data="/images/animations/stars.svg"></object>
      </div>
    </div>
  );
};

export default AccountBlock;