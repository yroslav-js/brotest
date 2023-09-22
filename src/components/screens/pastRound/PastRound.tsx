"use client"

import {useEffect} from "react";
import PastRoundBlock from "@/components/screens/pastRound/PastRoundBlock";
import PastRoundActivity from "@/components/screens/pastRound/PastRoundActivity";
import {useAppDispatch, useAppSelector} from "@/hooks/reduxHooks";
import {getChosenLottery} from "@/redux/features/lotterySlice";

const PastRound = ({id}: { id: string }) => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getChosenLottery(id))
  }, [])

  return (
    <>
      <PastRoundBlock />
      <PastRoundActivity />
    </>
  );
};

export default PastRound;