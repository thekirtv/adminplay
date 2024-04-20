'use client'
import Styles from './Footer.module.css'
import Link from "next/link"

import { FooterLogo  } from './FooterLogo'

export const Footer = () => {
  return (
    <footer className={Styles['footer']}>
      <div className={Styles['footer__logo']}>
      <FooterLogo/>
      </div>
    
      <ul className={Styles['social-list']}>
        <li className={Styles['social-list__item']}>
          <a href="" className={`button ${Styles['social-list__link']}`}>YT</a>
        </li>
        <li className={Styles['social-list__item']}>
          <a href="" className={`button ${Styles['social-list__link']}`}>ВК</a>
        </li>
        <li className={Styles['social-list__item']}>
          <a href=""  className={`button ${Styles['social-list__link']}`}>TG</a>
        </li>
      </ul>
    </footer>
  )
}