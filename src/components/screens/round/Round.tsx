import {FC} from "react";
import RoundBlock from "@/components/screens/round/RoundBlock";
import FundingTiers from "@/components/ui/FundingTiers/FundingTiers";
import RoundActivity from "@/components/screens/round/RoundActivity";

const Round: FC = () => {
  return (
    <>
      <RoundBlock/>
      <FundingTiers/>
      <RoundActivity/>
    </>
  );
};

export default Round;