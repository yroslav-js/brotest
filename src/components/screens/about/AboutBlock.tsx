import {FC} from "react";
import clsx from "clsx";
import styles from './AboutBLock.module.scss'

const AboutBlock: FC = () => {
  return (
    <div className={clsx('block container', styles.about)}>
      <div className={clsx(styles.about__info)}>
        <div className="heading heading--size-a">About Bro2Bro</div>
        <div className={clsx("desc-block", styles.descBlock)}>
          <p>
            Bro2Bro is a fair game based on a fully decentralised smart contract
            that works without any human intervention.
          </p>
        </div>
      </div>
      <div className={clsx(styles.about__animation)}>
        <object data="/images/animations/gas.svg"></object>
      </div>
      <div className={clsx("double-block", styles.doubleBlock)}>
        <div className="heading heading--size-c">How does it work?</div>
        <div className={clsx("desc-block", styles.descBlock)}>
          <p>
            The essence of the game is very simple and it consists in the fact
            that the user is offered to buy tickets in the active round and
            after the expiry of the round time or if the pool is collected, the
            smart contract algorithm will select three random tickets between
            which the pool of the round will be distributed in the proportions
            of 80 / 10 / 10.
          </p>
          <p>
            To become a participant of the game you need to have a
            cryptocurrency wallet and enough USDT to buy the desired number of
            tickets.
          </p>
        </div>
      </div>
      <div className={clsx("double-block", styles.doubleBlock)}>
        <div className="heading heading--size-c">Fully decentralised</div>
        <div className={clsx("desc-block", styles.descBlock)}>
          <p>
            The game is played through a fully decentralized smart contract
            which contains all the logic of the game, which means that it
            completely eliminates the human factor, which in any way can affect
            the process or the outcome of the game!
          </p>
          <p>
            Bro2Bro smart contract has undergone a rigorous security and
            stability assessment conducted by Hacken, resulting in a notable
            high score.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutBlock;