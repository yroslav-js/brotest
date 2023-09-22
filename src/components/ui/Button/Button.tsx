import {FC, ReactNode} from "react";
import Link from "next/link";
import styles from "./Button.module.scss"
import clsx from "clsx";

interface IButtonProps {
  children: ReactNode
  size?: 'a' | 'b'
  filled?: 'outline' | 'filled' | 'green'
  link?: string
  headerButton?: boolean
  onClick?: () => any
  style?: any
}

const Button: FC<IButtonProps> = ({
                                    children,
                                    size = 'a',
                                    filled = 'filled',
                                    link = '',
                                    headerButton = false,
                                    onClick,
                                    style
                                  }) => {


  return (
    <Link href={link} className={clsx(styles.button, 'button',
      headerButton && styles.headerButton,
      filled === 'filled' ? styles.buttonPurpleFilled : filled === 'green' ? styles.buttonGreenFilled : styles.buttonPurpleOutlined,
      size === 'a' ? styles.buttonSizeA : styles.buttonSizeB)} onClick={onClick} style={style}>
      {children}
    </Link>
  );
};

export default Button;