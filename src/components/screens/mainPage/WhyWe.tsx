import React, {FC} from "react";
import Button from "@/components/ui/Button/Button";
import './WhyWe.scss'
import ParticipateButton from "@/components/ui/Participate/ParticipateButton";

const WhyWe: FC = () => {
  return (
    <>
      <div className="block mt-150 participate container">
        <div className="participate__slogan">
          <div className="heading heading--size-c">
            Participate, get your dream to come true and help a bro out!
          </div>
          <ParticipateButton>Participate</ParticipateButton>
        </div>
        <div className="participate__animation">
          <object data="/images/animations/participate.svg"></object>
        </div>
      </div>

      <div className="block mt-150 why-we container">
        <div className="why-we__item">
          <div className="why-we__item-animation">
            <object
              data="/images/animations/easy-to-participate.svg"
              className="easy-to-participate"
            ></object>
          </div>
          <div className="why-we__item-info">
            <div className="heading heading--size-c">Easy to participate</div>
            <div className="desc-block">
              <p>
                Simply connect your wallet to your Bro2Bro smart contract, select
                the number of tickets, buy the tickets and you're in the game!
              </p>
            </div>
          </div>
        </div>
        <div className="why-we__item">
          <div className="why-we__item-animation why-we__item-animation--mobile">
            <object data="/images/animations/decentralized-and-safe.svg"></object>
          </div>
          <div className="why-we__item-info">
            <div className="heading heading--size-c">
              Fully decentralized and safe process
            </div>
            <div className="desc-block">
              <p>
                Bro2Bro smart contract is completely decentralized and has
                undergone a rigorous security and stability assessment conducted
                by Hacken, resulting in a notable high score.
              </p>
            </div>
          </div>
          <div className="why-we__item-animation why-we__item-animation--www">
            <object data="/images/animations/decentralized-and-safe.svg"></object>
          </div>
        </div>
        <div className="why-we__item">
          <div className="why-we__item-animation why-we__item-animation">
            <object data="/images/animations/transparent-and-honest.svg"></object>
          </div>
          <div className="why-we__item-info">
            <div className="heading heading--size-c">
              Transparent and honest games
            </div>
            <div className="desc-block">
              <p>
                Our game is completely transparent and honest, allowing absolutely
                any participant to become a winner without exception!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhyWe;