import {FC, useEffect, useState} from "react";
import Link from "next/link";
import clsx from "clsx";
import styles from './Header.module.scss'
import {usePathname} from "next/navigation";
import dynamic from "next/dynamic";

const ConnectWallet = dynamic(() => import('./ConnectWallet'), {ssr: false})

const Header: FC = () => {
  const [active, setActive] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    if (active) document.querySelector("body")?.classList.add('active')
    else document.querySelector("body")?.classList.remove('active')
  }, [active])

  return (
    <div className={clsx("container", styles.header, active && styles.active)}>
      <div className={styles.closeArea} onClick={() => setActive(false)}/>
      <Link href="" onClick={(e) => {
        e.stopPropagation()
        setActive(prevState => !prevState)
      }} className={styles.header__mobileMenuIcon}></Link>
      <Link href="/" className={styles.header__logo}>
        <img
          src="/images/logo.svg"
          alt="bro2bro fundraising platform logotype"
          title="bro2bro fundraising platform logotype"
        />
      </Link>
      <div className={styles.header__menu}>
        <div className={styles.header__menuContainer} onClick={() => setActive(false)}>
          <Link href="/about" className={pathname === '/about' ? styles.selected : ''}>Bro2Bro</Link>
          <Link href="/pastRounds" className={pathname === '/pastRounds' ? styles.selected : ''}>Past rounds</Link>
          <a href="https://telegram.me/latfilm" target="_blank">Support</a>
        </div>
        <ConnectWallet/>
      </div>
    </div>
  );
};

export default Header;