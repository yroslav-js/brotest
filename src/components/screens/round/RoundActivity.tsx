import {FC} from "react";
import Button from "@/components/ui/Button/Button";
import '../../assets/styles/activity.scss'
import CurrentRoundActivity from "@/components/ui/CurrentRoundActivity/CurrentRoundActivity";
import ParticipateButton from "@/components/ui/Participate/ParticipateButton";

const RoundActivity: FC = () => {
  return (
    <div
      className="block mt-150 table table--round-transactions top-line container"
    >
      <div className="heading heading--size-b">Round activity</div>
      <div className="table__content">
        <div className="table__container">
          <div className="table__data-container">
            <CurrentRoundActivity/>
          </div>
        </div>
        <div className="table__buttons">
          <ParticipateButton>Buy tickets</ParticipateButton>
          <Button
            link="/pastRounds"
            filled='outline'>
            Past rounds
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoundActivity;