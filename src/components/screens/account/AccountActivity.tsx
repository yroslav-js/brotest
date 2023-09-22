"use client"

import {FC, useEffect, useState} from "react";
import Link from "next/link";
import '../../assets/styles/activity.scss'
import {useAppSelector} from "@/hooks/reduxHooks";
import {zeroPad} from "react-countdown";
import dynamic from "next/dynamic";
import clsx from "clsx";

// @ts-ignore
const Countdown = dynamic(() => import('react-countdown'), {
  ssr: false
})

const AccountActivity: FC = () => {
  const userData = useAppSelector(state => state.lotterySlice.user)
  const [maxPrize, setMaxPrize] = useState(new Map)

  useEffect(() => {
    if (userData?.tickets?.length) {
      const prizes = new Map
      userData.tickets.map(ticket => {
        if (ticket.win) {
          const prize = prizes.get(ticket.lottery)
          if (ticket.prize as number > Number(prize) || prize === undefined) {
            prizes.set(ticket.lottery, ticket.prize)
          }
        }
      })
      setMaxPrize(prizes)
    }
  }, [userData])

  return (
    <div className="block mt-150 table table--account top-line container">
      <div className="heading heading--size-b">Check out your activity</div>
      <div className="table__content">
        <div className="table__data-container">
          <div className="table__data-content">
            <div className="table__headings-line">
              <div>Round</div>
              <div>Ticket</div>
              <div>Transaction hash</div>
              <div>Prize</div>
              <div>Status</div>
            </div>
            {userData?.lotteries?.length === 0 ? <div
              style={{
                fontSize: '18px',
                color: '#f8f4e1',
                textAlign: 'center'
              }}>Empty</div> : userData?.lotteries?.map((_l, index) => {
              const lottery = userData.lotteries[userData.lotteries?.length - 1 - index]
              const newDate = lottery.timestampEnd ? new Date(lottery.timestampEnd * 1000) : new Date(lottery.endDate * 1000)
              const year = newDate.getFullYear()
              const month = newDate.getMonth()
              const date = newDate.getDate()
              const hours = newDate.getHours()
              const minutes = newDate.getMinutes()
              return (
                <div key={lottery.currentId}
                     className={lottery.timestampEnd ? "table__group-line" : "table__group-line table__group-line--active"}>
                  <div className="table__group-line-round">
                    {lottery.timestampEnd
                      ? <>
                        <Link href={`/pastRound/${lottery.currentId}`}>{lottery.currentId}</Link>
                        <p>
                          Round ended on:<br/>
                          {date > 9 ? date : `0${date}`}.{month > 9 ? month : `0${month}`}.{year} {hours}:{minutes > 9 ? minutes : `0${minutes}`}
                        </p>
                      </> : <>
                        <Link href="/round">{lottery.currentId}</Link>
                        <p>
                          Time remaining:<br/>
                          <Countdown
                            date={newDate || Date.now()}
                            renderer={({hours, minutes, seconds}) => (
                              <>
                                <span className="purple">{zeroPad(hours)}</span> h
                                <span className="purple"> {zeroPad(minutes)}</span> m
                                <span className="purple"> {zeroPad(seconds)}</span> s
                              </>
                            )}
                          />
                        </p>
                      </>}
                  </div>
                  <div className="margin-auto">
                    {userData?.tickets?.map((_t, index) => {
                      const ticket = userData?.tickets[userData.tickets?.length - 1 - index]
                      if (ticket.lottery !== lottery._id) return null
                      return (
                        // <div className={ticket.win ? "table__line--winner-2x table__line" : "table__line"}
                        <div
                          className={clsx("table__line", ticket.win && maxPrize.get(ticket.lottery) === ticket?.prize && "table__line--winner-1x" || ticket.win && "table__line--winner-2x")}
                          key={ticket._id}>
                          <div>{ticket.ticketId}</div>
                          <div>
                            <a href={`https://testnet.bscscan.com/tx/${ticket.txHash}`} target="_blank">
                              {ticket.txHash}
                            </a>
                          </div>
                          <div>{ticket.win ? `${ticket?.prize} USDT` : '-'}</div>
                          {ticket.win ? <div><img src="/images/icon-trophy-purple.svg"/> Winner</div>
                            : lottery.timestampEnd && <div><img src="/images/icon-sad-smile.svg"/> Not win</div>}
                          {lottery.timestampEnd ?
                            <></>
                            : <div>Active round</div>}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountActivity;