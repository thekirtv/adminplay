'use client'

import { useContext } from "react";
import { AuthContext } from "@/app/context/app-context";

import { useStore } from "@/app/store/app-store";

import { useState, useEffect } from 'react';
import { usePathname } from "next/navigation";
import Link from "next/link"
import { Overlay } from "../Overlay/Overlay"
import { Popup } from "../Popup/Popup"
import { AuthForm } from "../AuthForm/AuthForm"
import { HeaderLogo } from "../Header/HeaderLogo"

import Styles from './Header.module.css'

export const Header = () => {

  const authContext = useStore();

  const handleLogout = () => {
    authContext.logout();
  };

  const [popupIsOpened, setPopupIsOpened] = useState(false);

  const openPopup = () => {
    setPopupIsOpened(!popupIsOpened)
  }
  const closePopup = () => {
    setPopupIsOpened(!popupIsOpened)
  }
  const authorize = () => {
    setIsAuthorized(isAuthorized)
  }

  const pathname = usePathname();

    return (

    <header  className={Styles['header']}>
      <div className={Styles['logo']}>
      <HeaderLogo/>
      </div>
   
        <nav  className={Styles['menu']}>
      
          <ul className={Styles['menu__list']}>
            <li className={Styles['menu__item']}>
              <Link  href="/new"
                className={`${Styles["menu__link"]} ${
                pathname === "/new" ? Styles["menu__link_active"] : ""}`}>
                Новинки
              </Link>
            </li>
            <li className={Styles['menu__item']}>
              <Link href="/popular"
                className={`${Styles["menu__link"]} ${
                pathname === "/popular" ? Styles["menu__link_active"] : ""}`}>Популярные</Link>
            </li>
            <li className={Styles['menu__item']}>
              <Link href="/shooters"
                className={`${Styles["menu__link"]} ${
                pathname === "/shooters" ? Styles["menu__link_active"] : ""}`}>Шутеры</Link>
            </li>
            <li className={Styles['menu__item']}>
              <Link href="/runners"
                className={`${Styles["menu__link"]} ${
                pathname === "/runners" ? Styles["menu__link_active"] : ""}`}>Ранеры</Link>
            </li>
            <li className={Styles['menu__item']}>
              <Link href="/pixel-games"
                className={`${Styles["menu__link"]} ${
                pathname === "/pixel-games" ? Styles["menu__link_active"] : ""}`}>Пиксельные</Link>
            </li>
            <li className={Styles['menu__item']}>
              <Link href="/tds"
                className={`${Styles["menu__link"]} ${
                pathname === "/tds" ? Styles["menu__link_active"] : ""}`}>TDS</Link>
            </li>
          </ul>
          <div className={Styles["auth"]}>
          {authContext.isAuth ? ( 
    <button className={Styles["auth__button"]} onClick={handleLogout}>
      Выйти
    </button>
    ) : (
    <button className={Styles["auth__button"]} onClick={openPopup}>
      Войти
    </button>
  )}
      </div>
        </nav>
      <Overlay isOpened = {popupIsOpened} close = {closePopup}/>
      <Popup isOpened = {popupIsOpened} close = {closePopup}>
      <AuthForm close={closePopup} setAuth={authorize}/>
      </Popup>
      </header>
    )
  }

  /**/
  //<img className={Styles['logo__image']} src="/images/logo.svg" alt="Логотип Pindie" />
  //className={`${Styles["overlay"]} ${props.isOpened && Styles["overlay_is-opened"]}`} popupIsOpened={openPopup}