import '../../assets/styles/mainBlock.scss'
import {useAppSelector} from "@/hooks/reduxHooks";

const PastRoundBlock = () => {
  const lottery = useAppSelector(state => state.lotterySlice.chosenLottery)
  const maxTickets = useAppSelector(state => state.contractSlice.contractData.maxTickets)
  const price = useAppSelector(state => state.contractSlice.contractData.price)
  const percent = (Math.round(100 / Number(maxTickets)) * Number(lottery.lottery?.ticketsCount)) || 0

  const newDate = new Date((lottery.lottery?.timestampEnd || lottery.lottery?.endDate || 0) * 1000)
  const year = newDate.getFullYear()
  const month = newDate.getMonth()
  const date = newDate.getDate()
  const hours = newDate.getHours()
  const minutes = newDate.getMinutes()
  return (
    <div className="main-block container">
      <div className="main-block__info">
        <div className="heading heading--size-a">Round {lottery.lottery?.currentId || 0}</div>
        <div className="desc-block">
          <p>
            There were <span className="green"> {lottery.lottery?.buyersCount || 0}</span> participants and
            <span className="green"> 3</span> winners in this round
            and {Number(maxTickets) - Number(lottery.lottery?.ticketsCount) === 0 && 'all'}
            <span className="green"> {lottery.lottery?.ticketsCount || 0}</span> tickets were sold out.
          </p>
          <p>
            Thank you to all participants and our sincere congratulations to the
            winners!
          </p>
        </div>
      </div>
      <div className="main-block__pool main-block__pool--past">
        <object
          data="/images/animations/pool.svg"
          className="main-block__pool-animation"
        ></object>
        <p><span
          className="green">Round pool: {Number(price) / 10 ** 18 * Number(lottery.lottery?.ticketsCount)} USDT</span>
        </p>
        <p>
          Round ended on<br/>
          <span
            className="purple">{date > 9 ? date : `0${date}`}.{month > 9 ? month : `0${month}`}.{year} {hours}:{minutes > 9 ? minutes : `0${minutes}`}</span>
        </p>
      </div>
      <div className="main-block__progress">
        <div className="main-block__progress-line" style={{width: `${percent || 1}%`}}>{percent}%</div>
      </div>
    </div>
  );
};

export default PastRoundBlock;