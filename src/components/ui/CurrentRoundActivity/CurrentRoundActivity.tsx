"use client"

import {FC} from "react";
import {useAppSelector} from "@/hooks/reduxHooks";

const CurrentRoundActivity: FC = () => {
  const tickets = useAppSelector(state => state.lotterySlice.tickets)

  return (
    <div className="table__data-content">
      <div className="table__headings-line">
        <div>Tickets</div>
        <div>Purchase date</div>
        <div>Transaction hash</div>
      </div>
      {tickets?.length === 0 ? <div
        style={{fontSize: '18px', color: '#f8f4e1', textAlign: 'center'}}>Empty</div> : tickets?.map((_t, index) => {
        if (index < 10) {
          const ticket = tickets[tickets?.length - 1 - index]
          const newDate = new Date(ticket.timestampTx * 1000)
          const year = newDate.getFullYear()
          const month = newDate.getMonth()
          const date = newDate.getDate()
          const hours = newDate.getHours()
          const minutes = newDate.getMinutes()
          return (
            <div className="table__line" key={ticket._id}>
              <div>{ticket.ticketId}</div>
              <div>{date > 9 ? date : `0${date}`}.{month > 9 ? month : `0${month}`}.{year}
                <span>{hours}:{minutes > 9 ? minutes : `0${minutes}`}</span>
              </div>
              <div>
                <a href={`https://testnet.bscscan.com/tx/${ticket.txHash}`} target="_blank">
                  {ticket.txHash}
                </a>
              </div>
            </div>
          )
        } else return null
      })}
    </div>
  );
};

export default CurrentRoundActivity;