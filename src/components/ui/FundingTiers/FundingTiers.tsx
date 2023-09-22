import React from 'react';
import './FundingTiers.scss'

const FundingTiers = () => {
  return (
    <div className="block mt-150 funding-tiers container">
      <div className="heading heading--size-b">Funding tiers</div>
      <div className="desc-block">
        <p>
          Each period there is 1 tear one funding package and 3 tear two funding
          packages handed out.
        </p>
      </div>
      <div className="funding-tiers__block">
        <div className="heading heading--size-a">
          1x {' '}
          <img src="/images/x-green.svg"/>
        </div>
        <span><b>80%</b> from pool</span>
      </div>
      <div className="funding-tiers__block">
        <div className="heading heading--size-a">
          2x {' '}
          <img src="/images/x-purple.svg"/>
          {' '}
          <img src="/images/x-purple.svg"/>
        </div>
        <span><b>10%</b> from pool</span>
      </div>
    </div>
  );
};

export default FundingTiers;