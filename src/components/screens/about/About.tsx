import {FC} from "react";
import Audit from "@/components/ui/Audit/Audit";
import FAQ from "@/components/ui/FAQ/FAQ";
import AboutBlock from "@/components/screens/about/AboutBlock";

const About: FC = () => {
  return (
    <>
      <AboutBlock/>
      <Audit/>
      <FAQ/>
    </>
  );
};

export default About;