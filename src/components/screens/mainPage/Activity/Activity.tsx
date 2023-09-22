"use client"

import {FC} from "react";
import Button from "@/components/ui/Button/Button";
import '../../../assets/styles/activity.scss'
import {useAppSelector} from "@/hooks/reduxHooks";

const Activity: FC = () => {
    const tickets = useAppSelector(state => state.lotterySlice.latestActivity)

    return (
      <div
        className="block mt-150 table table--round-transactions top-line container"
      >
        <div className="heading heading--size-b">Latest Bro activity</div>
        <div className="table__content">
          <div className="table__container">
            <div className="table__data-container">
              <div className="table__data-content">
                <div className="table__headings-line">
                  <div>Tickets</div>
                  <div>Purchase date</div>
                  <div>Transaction hash</div>
                </div>
                {tickets?.length === 0 ? <div
                  style={{
                    fontSize: '18px',
                    color: '#f8f4e1',
                    textAlign: 'center'
                  }}>Empty</div> : tickets?.map((ticket, index) => {
                  if (index < 10) {
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
            </div>
          </div>
          <div className="table__buttons">
            <Button link="/round">Active round</Button>
            <Button
              link="/pastRounds"
              filled='outline'
            >
              Past rounds
            </Button>
          </div>
        </div>
      </div>
    );
  }
;

export default Activity;