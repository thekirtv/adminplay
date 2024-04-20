'use client';

import { usePathname } from "next/navigation";
import Link from "next/link"

import Styles from './Header.module.css'

export const HeaderLogo = () => {

const pathname = usePathname();
return (

    pathname === "/" ? <img className={Styles['logo__image']} src="/images/logo.svg" alt="Логотип Pindie"/>
     : <Link href="/"><img className={Styles['logo__image']} src="/images/logo.svg" alt="Логотип Pindie"/></Link>

)
}