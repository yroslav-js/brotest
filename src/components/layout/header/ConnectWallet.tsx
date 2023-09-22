import {FC} from "react";
import Button from "@/components/ui/Button/Button";
import {useAccount} from "wagmi";
import {useAppDispatch} from "@/hooks/reduxHooks";
import {setIsModalOpen} from "@/redux/features/contractSlice";

const ConnectWallet: FC = () => {
  const dispatch = useAppDispatch()
  const {isConnected} = useAccount()

  return (
    <>
      {isConnected ?
        <Button link='/account' filled='green' size='b' headerButton={true}>
          <img src="/images/icon-green-user.svg"/>
          <span>Private zone</span>
        </Button> :
        <Button filled='outline' size='b' headerButton={true}
                onClick={() => dispatch(setIsModalOpen([true, 'connect']))}>
          <img src="/images/icon-purple-user.svg"/>
          <span> Connect wallet </span>
        </Button>
      }
    </>
  );
};

export default ConnectWallet;