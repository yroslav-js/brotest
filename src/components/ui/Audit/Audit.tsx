import {FC} from "react";
import './Audit.scss'

const Audit: FC = () => {
  return (
    <div className="block mt-150">
      <div className="container">
        <div className="audit">
          <div className="heading heading--size-d">
            Bro2Bro is audited by Hacken
          </div>
          <div>
            <img src="/images/hacken-audit.svg" alt="audited by Hacken"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Audit;