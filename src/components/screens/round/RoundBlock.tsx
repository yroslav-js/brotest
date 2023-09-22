"use client"

import React, {FC} from "react";
import '../../assets/styles/mainBlock.scss'
import ParticipateButton from "@/components/ui/Participate/ParticipateButton";
import CurrentPool from "@/components/ui/CurrentPool/CurrentPool";
import {zeroPad} from "react-countdown";
import {useAppSelector} from "@/hooks/reduxHooks";
import dynamic from "next/dynamic";

// @ts-ignore
const Countdown = dynamic(() => import('react-countdown'), {
  ssr: false
})


const RoundBlock: FC = () => {
  const contractData = useAppSelector((state) => state.contractSlice.contractData)
  const lottery = useAppSelector((state) => state.lotterySlice.lottery)
  const percent = (Math.round(100 / Number(contractData.maxTickets)) * Number(contractData.currentTickets)) || 0

  return (
    <div className="main-block container">
      <div className="main-block__info">
        <div className="heading heading--size-a">Round {Number(contractData.currentId)}</div>
        <div className="desc-block">
          <p>
            This round has already <span className="green">{lottery?.buyersCount || 0}</span> participants
            who have purchased <span className="green">{lottery?.ticketsCount || 0}</span> tickets. At the
            moment there are <span
            className="green">{Number(contractData.maxTickets || 0) - (lottery?.ticketsCount || 0)}</span> tickets
            left.
          </p>
        </div>
        <ParticipateButton>Participate</ParticipateButton>
      </div>
      <div className="main-block__pool">
        <object
          data="/images/animations/pool.svg"
          className="main-block__pool-animation"
        ></object>
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
          )}/>
        </p>
      </div>
      <div className="main-block__progress">
        <div className="main-block__progress-line"
             style={{width: `${percent || 1}%`}}>{percent}%
        </div>
      </div>
    </div>
  );
};

export default RoundBlock;