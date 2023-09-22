"use client"

import {FC, useState} from "react";
import styles from './FAQ.module.scss'
import clsx from "clsx";

const questions = [{
  q: 'What is Bro2Bro?',
  a: <>
    <p>
      Bro2Bro is a fair game based on a fully decentralised smart
      contract that works without any human intervention.
    </p>
    <p>
      The essence of the game is very simple and it consists in the
      fact that the user is offered to buy tickets in the active round
      and after the expiry of the round time or if the pool is
      collected, the smart contract algorithm will select three random
      tickets between which the pool of the round will be distributed
      in the proportions of 80 / 10 / 10.
    </p>
    <p>
      Absolutely every participant can become a winner. All processes
      are absolutely transparent!
    </p>
  </>
},
  {
    q: 'Who determines the winner and how?',
    a: <>
      <p>
        The essence of the game is very simple and it consists in the
        fact that the user is offered to buy tickets in the active round
        and after the expiry of the round time or if the pool is
        collected, the smart contract algorithm will select three random
        tickets between which the pool of the round will be distributed
        in the proportions of 80 / 10 / 10.
      </p>
    </>
  },
  {
    q: 'How quickly is the prize pool paid out to the winner?',
    a: <>
      <p>
        The essence of the game is very simple and it consists in the
        fact that the user is offered to buy tickets in the active round
        and after the expiry of the round time or if the pool is
        collected, the smart contract algorithm will select three random
        tickets between which the pool of the round will be distributed
        in the proportions of 80 / 10 / 10.
      </p>
    </>
  },
  {
    q: 'What is a smart contract and what is it needed for?',
    a: <>
      <p>
        The essence of the game is very simple and it consists in the
        fact that the user is offered to buy tickets in the active round
        and after the expiry of the round time or if the pool is
        collected, the smart contract algorithm will select three random
        tickets between which the pool of the round will be distributed
        in the proportions of 80 / 10 / 10.
      </p>
    </>
  },
  {
    q: 'What is the difference between a regular smart contract and a decentralized one?',
    a: <>
      <p>
        The essence of the game is very simple and it consists in the
        fact that the user is offered to buy tickets in the active round
        and after the expiry of the round time or if the pool is
        collected, the smart contract algorithm will select three random
        tickets between which the pool of the round will be distributed
        in the proportions of 80 / 10 / 10.
      </p>
    </>
  },
]

const Faq: FC = () => {
  const [currentQuestionId, setCurrentQuestionId] = useState(-1)

  return (
    <div className={clsx('block mt-150 top-line', styles.faq)}>
      <div className="container">
        <div className="heading heading--size-a">FAQ</div>
        <div className={styles.faq__items}>
          {questions?.map((item, index) => (
            <div key={index}
                 className={clsx(styles.faq__item, currentQuestionId === index ? styles.faq__itemOpened : '')}
                 onClick={() => {
                   if (currentQuestionId === index) return setCurrentQuestionId(-1)
                   setCurrentQuestionId(index)
                 }}>
              <div className={styles.faq__question}>
                {item.q}
                <div className={styles.pM}></div>
              </div>
              <div className={styles.faq__answer}>
                {item.a}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;