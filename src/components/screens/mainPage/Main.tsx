import {FC} from "react";
import MainBlock from "@/components/screens/mainPage/MainBlock/MainBlock";
import HowItWorks from "@/components/screens/mainPage/HowItWorks";
import FundingTiers from "@/components/ui/FundingTiers/FundingTiers";
import WhyWe from "@/components/screens/mainPage/WhyWe";
import Audit from "@/components/ui/Audit/Audit";
import FAQ from "@/components/ui/FAQ/FAQ";
import Activity from "@/components/screens/mainPage/Activity/Activity";

const Main: FC = () => {
  return (
    <>
      <MainBlock/>
      <HowItWorks/>
      <FundingTiers/>
      <Activity/>
      <WhyWe/>
      <Audit/>
      <FAQ/>
    </>
  );
};

export default Main;