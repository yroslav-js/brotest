"use client"

import {FC} from "react";
import Link from "next/link";
import './HowItWorks.scss'
import {useConnect} from "wagmi";
import {useAppDispatch} from "@/hooks/reduxHooks";
import {setIsModalOpen} from "@/redux/features/contractSlice";

const HowItWorks: FC = () => {
  const {connect, connectors} = useConnect()
  const dispatch = useAppDispatch()

  return (
    <div className="block mt-150 how-it-works container">
      <div className="heading heading--size-b">Easy steps to participate</div>
      <div className="how-it-works__items">
        <div className="how-it-works__item">
          <div className="how-it-works__number">
            <span>1</span>
          </div>
          <div className="heading heading--size-d">Connect your wallet</div>
          <div className="desc-block">
            <p>
              <a style={{cursor: "pointer"}} onClick={(e) => {
                e.preventDefault()
                dispatch(setIsModalOpen([true, 'connect']))
              }}>Connect your wallet</a> to purchase tickets and
              <a style={{cursor: "pointer"}} onClick={(e) => {
                e.preventDefault()
                dispatch(setIsModalOpen([true, 'participate']))
              }}> participate</a>, and let your dreams
              come true.
            </p>
          </div>
        </div>
        <div className="how-it-works__item">
          <div className="how-it-works__number">
            <span>2</span>
          </div>
          <div className="heading heading--size-d">
            Select the number of tickets
          </div>
          <div className="desc-block">
            <p>
              Choose how many tickets you want to buy. More tickets mean better
              ods of winning.
            </p>
          </div>
        </div>
        <div className="how-it-works__item">
          <div className="how-it-works__number">
            <span>3</span>
          </div>
          <div className="heading heading--size-d">
            Buy the tickets & participate
          </div>
          <div className="desc-block">
            <p>
              The entire sequence transpires utilizing a
              <a target='_blank'
                 href="https://testnet.bscscan.com/address/0xB3A0d317ac8fED298d50C500f4135f7e0aA27Db1"> decentralized
                smart contract</a> mechanism.
            </p>
          </div>
        </div>
        <div className="how-it-works__item">
          <div className="how-it-works__number">
            <span>4</span>
          </div>
          <div className="heading heading--size-d">
            Receive the funding in your wallet!
          </div>
          <div className="desc-block">
            <p>
              Once the round's conditions are met, the winners will receive
              their winnings automatically.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;