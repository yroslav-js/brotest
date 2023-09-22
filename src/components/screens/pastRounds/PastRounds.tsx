import {FC} from "react";
import PastRoundsBlock from "@/components/screens/pastRounds/PastRoundsBlock";
import PastRoundsActivity from "@/components/screens/pastRounds/PastRoundsActivity";

const PastRounds: FC = () => {
  return (
    <>
      <PastRoundsBlock/>
      <PastRoundsActivity/>
    </>
  );
};

export default PastRounds;