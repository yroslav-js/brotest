'use client'

import React, {FC, ReactNode} from "react";
import {useAppDispatch} from "@/hooks/reduxHooks";
import clsx from "clsx";
import styles from "@/components/ui/Button/Button.module.scss";
import {setIsModalOpen} from "@/redux/features/contractSlice";

const ParticipateButton: FC<{ children: ReactNode }> = ({children}) => {
  const dispatch = useAppDispatch()

  return (
    <div className={clsx(styles.button, 'button', styles.buttonPurpleFilled, styles.buttonSizeA)}
         onClick={() => dispatch(setIsModalOpen([true, 'participate']))}>
      {children}
    </div>
  )
};

export default ParticipateButton;