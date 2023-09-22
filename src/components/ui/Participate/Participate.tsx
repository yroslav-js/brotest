"use client"

import {NextPage} from "next";
import Button from "@/components/ui/Button/Button";
import styles from './Participate.module.scss';
import clsx from "clsx";
import {useAppDispatch, useAppSelector} from "@/hooks/reduxHooks";
import {setIsModalOpen} from "@/redux/features/contractSlice";
import {useEffect, useState} from "react";
import {Range} from "react-range";
import {useBuyTickets} from "@/hooks/contractHooks";
import {useDebounce} from "@/hooks/useDebounce";
import CurrentPool from "@/components/ui/CurrentPool/CurrentPool";
import {zeroPad} from "react-countdown";
import Link from "next/link";
import useAppSwitchNetwork from "@/hooks/useAppSwitchNetwork";
import dynamic from "next/dynamic";

import {Oval} from "react-loader-spinner";
import {setCurrentAvailableAmountTickets, setPurchasedTickets} from "@/redux/features/lotterySlice";

// @ts-ignore
const Countdown = dynamic(() => import('react-countdown'), {
  ssr: false
})

const Participate: NextPage = () => {
  const dispatch = useAppDispatch()
  const isModalOpen = useAppSelector((state) => state.contractSlice.isModalOpen)
  const [modalView, setModalView] = useState(false)
  const [amount, setAmount] = useState(1)
  const [loader, setLoader] = useState(false)
  const contractData = useAppSelector((state) => state.contractSlice.contractData)
  const currentAmountUserTickets = useAppSelector((state) => state.lotterySlice.currentAmountUserTickets)
  const availableAmountTickets = useAppSelector((state) => state.lotterySlice.availableAmountTickets)
  const lottery = useAppSelector((state) => state.lotterySlice.lottery)
  const debouncedAmount = useDebounce(amount, 500)
  const [currentAmountPurchaseTickets, setCurrentAmountPurchaseTickets] = useState(0)
  const buyTickets = useBuyTickets(amount, debouncedAmount, Number(contractData.price || 0))
  const [purchaseSuccess, setPurchaseSuccess] = useState(false)
  const checkNetwork = useAppSwitchNetwork()

  const maxTicketsForUser = (): number => {
    const userTicket = Number(contractData.maxTicketsForWallet) - currentAmountUserTickets
    const allTicket = Number(contractData.maxTickets || 0) - (lottery?.ticketsCount || 0) - availableAmountTickets
    return userTicket < allTicket ? userTicket : allTicket
  }

  useEffect(() => {
    if (buyTickets.isError) setLoader(false)
  }, [buyTickets.isError])

  useEffect(() => {
    if (buyTickets.isSuccess) {
      dispatch(setPurchasedTickets(currentAmountUserTickets + currentAmountPurchaseTickets))
      dispatch(setCurrentAvailableAmountTickets(availableAmountTickets + currentAmountPurchaseTickets))
      setPurchaseSuccess(true)
      setLoader(false)
    }
  }, [buyTickets.isSuccess])

  useEffect(() => {
    if (maxTicketsForUser() < amount) {
      setAmount(maxTicketsForUser())
    }
  }, [maxTicketsForUser()])

  useEffect(() => {
    if (buyTickets.isFinish) {
      // setTimeout(() => {
      buyTickets?.write?.()
      // }, 20000)
    }
  }, [buyTickets.isFinish])

  useEffect(() => {
    setTimeout(() => setModalView(false), 200)
  }, [isModalOpen])

  useEffect(() => {
    if (amount > 10) setAmount(10)
    else setAmount(Math.round(amount))
  }, [amount])

  return (
    <div className={clsx(styles.popupOverlay, isModalOpen && styles.popupOpen, modalView && styles.view)}
         onClick={() => {
           dispatch(setIsModalOpen([false, 'participate']))
           setModalView(true)
         }}>

      {!purchaseSuccess ?
        <div className={clsx(styles.popup, styles.popupPurchase)} onClick={(e) => e.stopPropagation()}>
          <div className={styles.popup__close} onClick={() => {
            dispatch(setIsModalOpen([false, 'participate']))
            setModalView(true)
          }}>
            <img src="/images/x-green.svg"/>
          </div>
          <p>Buy tickets to participate in active round</p>
          {contractData.currentId &&
            <div className={clsx("heading heading--size-a", styles.heading)}>{Number(contractData.currentId)}</div>}
          <div className="desc-block">
            <CurrentPool/>
            <p>
              Winners announced when pool reaches 20 000 USDT<br/>
              or after <Countdown
              date={Number(contractData.endDate) * 1000 || Date.now()}
              renderer={({hours, minutes, seconds}) => (
                <>
                  <span className="purple">{zeroPad(hours)}</span> hours <span
                  className="purple">{zeroPad(minutes)}</span> minutes <span
                  className="purple">{zeroPad(seconds)}</span> seconds
                </>
              )}
            />
            </p>
          </div>
          {maxTicketsForUser() >= 2 ?
            <div className={styles.popup__range}>
              <div>{maxTicketsForUser() === 0 ? 0 : 1}</div>
              <Range
                onChange={(values) => setAmount(values[0])}
                values={amount && amount <= maxTicketsForUser() ? [amount] : [1]}
                renderTrack={({props, children}) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: '6px',
                      width: '100%',
                      backgroundColor: '#0003'
                    }}
                  >
                    {children}
                    <div style={{
                      ...props.style,
                      height: '6px',
                      width: `${amount && amount - 1 > 0 ? (100 / (maxTicketsForUser() - 1)) * (amount - 1) : 0}%`,
                      backgroundColor: '#77ef8b',
                      position: 'absolute'
                    }}>
                    </div>
                  </div>
                )}
                renderThumb={({props}) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: '1.375em',
                      width: '0.5em',
                      borderRadius: '10px',
                      backgroundColor: '#77ef8b'
                    }}
                  />
                )} step={1} min={maxTicketsForUser() === 0 ? 0 : 1} max={maxTicketsForUser()}/>
              <div>{maxTicketsForUser()}</div>
            </div>
            : <></>}
          <div className={styles.popup__ticketsTerms}>
            Select the number of remaining tickets
            <span>1 ticket = {Number(contractData.price || 0) / 10 ** 18} USDT</span>
          </div>
          <div className={styles.popup__tickets}>
            <div>
              <input type="number" value={amount.toString()} min={maxTicketsForUser() === 0 ? 0 : 1}
                     max={maxTicketsForUser()}
                     onChange={(e) => {
                       if (e.target.value.includes('-')) return
                       if (Number(e.target.value) > maxTicketsForUser()) setAmount(maxTicketsForUser())
                       else setAmount(Number(e.target.value))
                     }}/>
            </div>
            <div style={{position: "relative"}}>
              {loader &&
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
              <div style={loader ? {opacity: .4} : {}}>
                <Button link="" style={loader ? {cursor: 'default'} : {}} onClick={() => {
                  checkNetwork()
                  if (amount > 0 && maxTicketsForUser() > 0 && !loader) {
                    setCurrentAmountPurchaseTickets(amount)
                    setLoader(true)
                    buyTickets?.approve?.()
                  }
                }}>Buy tickets</Button>
              </div>
            </div>
          </div>
        </div>

        :

        <div className={clsx(styles.popup, styles.popupResult)} onClick={(e) => e.stopPropagation()}>
          <div className={styles.popup__close}>
            <img src="/images/x-green.svg"/>
          </div>
          <div className={styles.popup__animation}>
            <object data="/images/animations/decentralized-and-safe.svg"></object>
          </div>
          <div className={clsx("heading heading--size-e", styles.heading)}>Successful purchase!</div>
          <p>
            You have purchased <span className="green">{currentAmountUserTickets}</span> tickets in the
            current round number <strong><Link href="/round">{Number(contractData.currentId)}</Link></strong>
          </p>
          <Button onClick={() => setPurchaseSuccess(false)}>Buy more tickets</Button>
        </div>
      }
    </div>
  );
};

export default Participate;