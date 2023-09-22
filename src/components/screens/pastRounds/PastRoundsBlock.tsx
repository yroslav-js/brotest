'use client'

import React, {FC} from "react";
import clsx from "clsx";
import styles from './HistoryBlock.module.scss'
import Button from "@/components/ui/Button/Button";
import ParticipateButton from "@/components/ui/Participate/ParticipateButton";
import {useAppSelector} from "@/hooks/reduxHooks";

const PastRoundsBlock: FC = () => {
  const currentRound = useAppSelector(state => state.contractSlice.contractData.currentId)

  return (
    <div className={clsx("block container", styles.history)}>
      <div>
        <div className="heading heading--size-b">We make history</div>
        <div className={clsx("desc-block", styles.descBlock)}>
          <p>
            Bro 2 Bro has hosted <span className="green">{Number(currentRound || 1) - 1}</span> rounds this far.
            That means <span className="green">{Number(currentRound || 1) * 3 - 3}</span> Bros that have got their
            goals funded thanks to bros helping bros. You could be the next one.
          </p>
        </div>
        <ParticipateButton>Participate</ParticipateButton>
      </div>
      <div>
        <object data="/images/animations/stars.svg"></object>
      </div>
    </div>
  );
};

export default PastRoundsBlock;