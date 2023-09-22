"use client"

import {FC} from "react";
import {useAppSelector} from "@/hooks/reduxHooks";

const CurrentPool: FC = () => {
  const contractData = useAppSelector(state => state.contractSlice.contractData)

  return (
    <p><span
      className="green">Current pool: {(Number(contractData.currentTickets || 0) * (Number(contractData.price || 0) / 10 ** 18))} USDT</span>
    </p>
  );
};

export default CurrentPool;