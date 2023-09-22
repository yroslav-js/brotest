"use client"

import {FC} from "react";
import Link from "next/link";
import styles from "./Footer.module.scss"
import clsx from "clsx";
import Pulse from "@/components/ui/Pulse/Pulse";
import {usePathname} from "next/navigation";

const Footer: FC = () => {
  const pathname = usePathname()

  return (
    <>
      <div className={clsx("footer", styles.footer)}>
        <div className={clsx("container", styles.container)}>
          <div className={clsx(styles.heading, "heading heading--size-e")}>
            Bros helping bros to get their things going.
          </div>
          <div className={styles.footer__menu}>
            <Link href="/about" className={pathname === '/about' ? styles.selected : ''}>Bro2Bro</Link>
            <Link href="/pastRounds" className={pathname === '/pastRounds' ? styles.selected : ''}>Past rounds</Link>
            <a href="https://telegram.me/latfilm" target="_blank">Support</a>
            <a href="mailto:info@bro2bro.com" target="_blank" className={styles.email}>
              info@bro2bro.com
            </a>
          </div>
          <div className={styles.footer__social}>
            <a href="https://telegram.me/latfilm" target="_blank">
              <img src="/images/social-telegram.svg"/>
              <span>@Bro2Bro</span>
            </a>
          </div>
        </div>
      </div>
      <div style={{maxWidth: '100vw', overflowX: 'hidden'}}>
        <div className={styles.logoLoop}/>
      </div>
      <Pulse/>
    </>
  );
};

export default Footer;