import '../../assets/styles/activity.scss'
import {useAppSelector} from "@/hooks/reduxHooks";
import {useAccount} from "wagmi";
import {useEffect, useState} from "react";
import clsx from "clsx";

const PastRoundActivity = () => {
  const tickets = useAppSelector(state => state.lotterySlice.chosenLottery.tickets)
  const [maxPrize, setMaxPrize] = useState(0)

  useEffect(() => {
    const max = tickets && tickets?.map(ticket => {
      if (ticket?.prize) {
        return ticket.prize
      }
      return 0
    })
    setMaxPrize(Math.max(...max))
  }, [tickets])

  return (
    <div className="block table table--round-transactions container">
      <div className="heading heading--size-b">Round activity</div>
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
                }}>Empty</div> : tickets?.map(ticket => {
                const newDate = new Date(ticket.timestampTx * 1000)
                const year = newDate.getFullYear()
                const month = newDate.getMonth()
                const date = newDate.getDate()
                const hours = newDate.getHours()
                const minutes = newDate.getMinutes()
                return (<div key={ticket._id}
                             className={clsx("table__line",
                               ticket.win && ticket?.prize === maxPrize && "table__line--winner-1x",
                               ticket.win && ticket?.prize && ticket.prize < maxPrize && "table__line--winner-2x")}>
                    <div>{ticket.ticketId}</div>
                    <div>{date > 9 ? date : `0${date}`}.{month > 9 ? month : `0${month}`}.{year}
                      <span>{hours}:{minutes > 9 ? minutes : `0${minutes}`}</span></div>
                    <div>
                      <a href={`https://testnet.bscscan.com/tx/${ticket.txHash}`} target="_blank">
                        {ticket.txHash}
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PastRoundActivity;