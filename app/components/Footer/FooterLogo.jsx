'use client';

import { usePathname } from "next/navigation";
import Link from "next/link"

import Styles from './Footer.module.css'

export const FooterLogo = () => {
    const pathname = usePathname();
    return (
      pathname === "/" ? <div><span className={Styles['footer__logo-name']}>pindie</span>
      <span className={Styles['footer__logo-copy']}>, XXI век</span></div>
      
      : <Link href="/"><span className={Styles['footer__logo-name']}>pindie</span>
      <span className={Styles['footer__logo-copy']}>, XXI век</span></Link>
    )
}










