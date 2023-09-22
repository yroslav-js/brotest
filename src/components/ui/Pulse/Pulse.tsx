import {FC} from "react";
import "./Pulse.scss"

const Pulse: FC = () => {
  return (
    <div className='fastChat'>
      <a href="https://telegram.me/latfilm" target="_blank">
        <img src="/images/social-telegram.svg"/>
      </a>
      <div className='pulse'>
        <div className='pulse__item pulse__item1'></div>
        <div className='pulse__item pulse__item2'></div>
        <div className='pulse__item pulse__item3'></div>
      </div>
    </div>
  );
};

export default Pulse;