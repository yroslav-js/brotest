"use client"

import Button from "@/components/ui/Button/Button";
import '../../../assets/styles/mainBlock.scss'
import ParticipateButton from "@/components/ui/Participate/ParticipateButton";
import CurrentPool from "@/components/ui/CurrentPool/CurrentPool";
import {useAppSelector} from "@/hooks/reduxHooks";
import {zeroPad} from "react-countdown";
import dynamic from "next/dynamic";
// @ts-ignore
const Countdown = dynamic(() => import('react-countdown'), {
  ssr: false
})


const MainBlock = () => {
  const contractData = useAppSelector((state) => state.contractSlice.contractData)
  const percent = (Math.round(100 / Number(contractData.maxTickets)) * Number(contractData.currentTickets)) || 0

  return (
    <div className="main-block container">
      <div className="main-block__info">
        <div className="heading heading--size-a">Get your dream to come true!</div>
        <p>
          Take part in a simple and fair game in which absolutely everyone has a
          chance to win. The decentralised smart contract makes all processes
          transparent and fully automated!
        </p>
        <ParticipateButton>Participate</ParticipateButton>
        <Button link="/round" filled='outline'>Round info</Button>
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
        <div className="main-block__progress-line" style={{width: `${percent || 1}%`}}>{percent}%</div>
      </div>
    </div>
  );
};

export default MainBlock;