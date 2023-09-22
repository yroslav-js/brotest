import {FC, useEffect, useState} from "react";
import clsx from "clsx";
import styles from "@/components/ui/Participate/Participate.module.scss";
import {setIsModalOpen} from "@/redux/features/contractSlice";
import {useAppDispatch, useAppSelector} from "@/hooks/reduxHooks";
import {useConnect} from "wagmi";
import ConnectButton from "@/components/ui/Button/ConnectButton";

const ConnectModal: FC = () => {
  const dispatch = useAppDispatch()
  const {connect, connectors} = useConnect()
  const isConnectModalOpen = useAppSelector((state) => state.contractSlice.isConnectModalOpen)
  const [modalView, setModalView] = useState(false)
  // const {open, close} = useWeb3Modal()


  useEffect(() => {
    setTimeout(() => {
      setModalView(false)
    }, 200)
  }, [isConnectModalOpen])


  return (
    <div className={clsx(styles.popupOverlay, isConnectModalOpen && styles.popupOpen, modalView && styles.view)}
         onClick={() => {
           dispatch(setIsModalOpen([false, 'connect']))
           setModalView(true)
         }}>
      <div className={clsx(styles.popup, styles.popupPurchase)} onClick={(e) => e.stopPropagation()}>
        <div className={styles.popup__close} onClick={() => {
          dispatch(setIsModalOpen([false, 'connect']))
          setModalView(true)
        }}>
          <img src="/images/x-green.svg"/>
        </div>
        <div className="desc-block">
          <p className="heading--size-d">Connect</p>
        </div>
        {connectors?.map((connector) => (
          <div key={connector.name}>
            <ConnectButton onClick={() => {
              connect({connector})
              dispatch(setIsModalOpen([false, 'connect']))
            }}>
                <span>
                {connector.name}
                </span>
              <img src="/images/icon-purple-user.svg"/>
            </ConnectButton>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConnectModal;