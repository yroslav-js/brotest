import {FC, ReactNode} from "react";
import clsx from "clsx";
import styles from "@/components/ui/Button/Button.module.scss";

const ConnectButton: FC<{ children: ReactNode, onClick: () => any }> = ({children, onClick}) => {
  return (
    <div className={clsx(styles.button, 'button',
      styles.buttonPurpleOutlined,
      styles.buttonSizeC)} onClick={onClick}>
      {children}
    </div>
  );
};

export default ConnectButton;