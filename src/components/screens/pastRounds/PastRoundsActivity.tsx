"use client"

import {FC, useEffect, useState} from "react";
import Link from "next/link";
import '../../assets/styles/activity.scss'
import {useAppSelector} from "@/hooks/reduxHooks";
import clsx from "clsx";

const PastRoundsActivity: FC = () => {
    const lotteries = useAppSelector(state => state.lotterySlice.lastLotteries)
    const [maxPrize, setMaxPrize] = useState(new Map)

    useEffect(() => {
      const prizes = new Map
      lotteries?.map(lottery => {
        if (lottery.lottery && lottery.lottery.currentId > 0) {
          return lottery.tickets.map(ticket => {
            if (ticket.win) {
              const prize = prizes.get(ticket.lottery)
              if (ticket.prize as number > Number(prize) || prize === undefined) {
                prizes.set(ticket.lottery, ticket.prize)
              }
            }
          })
        }
      })
      setMaxPrize(prizes)
    }, [lotteries])

    return (
      <div className="block mt-150 table table--past-rounds container">
        <div className="table__content">
          <div className="table__data-container">
            <div className="table__data-content">
              <div className="table__headings-line">
                <div>Round</div>
                <div>Ticket</div>
                <div>Winner</div>
                <div>Pool allocation</div>
                <div>Prize</div>
              </div>
              {lotteries && lotteries?.length ? lotteries?.map(lottery => {
                if (lottery.lottery && lottery.lottery.currentId > 0) {
                  const newDate = new Date((lottery.lottery.timestampEnd || lottery.lottery.endDate) * 1000)
                  const year = newDate.getFullYear()
                  const month = newDate.getMonth()
                  const date = newDate.getDate()
                  const hours = newDate.getHours()
                  const minutes = newDate.getMinutes()

                  return (<div key={lottery.lottery.currentId} className="table__group-line">
                    <div className="table__group-line-round">
                      <Link href={`/pastRound/${lottery.lottery.currentId}`}>{lottery.lottery.currentId}</Link>
                      <p>
                        Round ended on:<br/>
                        {date > 9 ? date : `0${date}`}.{month > 9 ? month : `0${month}`}.{year} {hours}:{minutes > 9 ? minutes : `0${minutes}`}
                      </p>
                    </div>
                    <div>
                      {lottery.tickets.filter(ticket => ticket.win)?.map(ticket => (
                        <div key={ticket._id}
                             className={clsx("table__line table__line--winner",
                               maxPrize.get(ticket.lottery) === ticket?.prize ? "table__line--winner-1x" : "table__line--winner-2x")}>
                          <div>{ticket.ticketId}</div>
                          <div>
                            <a href={`https://testnet.bscscan.com/tx/${ticket.txHash}`}
                               target="_blank">{ticket.txHash}</a>
                          </div>
                          <div>{maxPrize.get(ticket.lottery) === ticket?.prize ? 80 : 10}%</div>
                          <div>{ticket?.prize} USDT</div>
                        </div>
                      ))}
                      {/*<div*/}
                      {/*  className="table__line table__line--winner table__line--winner-2x"*/}
                      {/*>*/}
                      {/*  <div>4</div>*/}
                      {/*  <div>*/}
                      {/*    <a href=""> 0x8abf49602f865b6c3d3e73868da0cca5042781e4 </a>*/}
                      {/*  </div>*/}
                      {/*  <div>10%</div>*/}
                      {/*  <div>1 460 USDT</div>*/}
                      {/*</div>*/}
                    </div>
                  </div>)
                }
              }) : <div style={{fontSize: '18px', color: '#f8f4e1', textAlign: 'center'}}>Empty</div>}
            </div>
          </div>
        </div>
      </div>
    );
  }
;

export default PastRoundsActivity;