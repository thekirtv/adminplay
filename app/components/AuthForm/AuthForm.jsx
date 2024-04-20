'use client'

import { useState, useEffect } from "react"
import { authorize } from "@/app/api/api-utils";
import { endpoints } from "@/app/api/config";
import { isResponseOk, getMe } from "@/app/api/api-utils";
import { useContext } from "react";
import { AuthContext } from "@/app/context/app-context";

import { useStore } from "@/app/store/app-store";

import Styles from './AuthForm.module.css';

export const AuthForm = (props) => {

  const authContext = useStore();
  const [authData, setAuthData] = useState({ identifier: "", password: "" });
const [message, setMessage] = useState({ status: null, text: null });



const handleInput = (e) => {
  const newAuthData = authData;
  newAuthData[e.target.name] = e.target.value;
  setAuthData(newAuthData);
    console.log(e)
    console.log(`${e.target.name}, ${e.target.value}`)
}

const handleSubmit = async (e) => {
e.preventDefault();
const userData = await authorize(endpoints.auth, authData);
if (isResponseOk(userData)) {
  authContext.login(userData.user, userData.jwt);
  setMessage({ status: "success", text: "Вы авторизовались!" });
} else {
  setMessage({ status: "error", text: "Неверные почта или пароль" });
}
};


useEffect(() => {
  let timer; 
  if (authContext.user) {
    timer = setTimeout(() => {
            
      props.close();
    }, 1000);
  }
  return () => clearTimeout(timer);
}, [authContext.user]);


useEffect(() => {
  authorize(endpoints.auth, {identifier: "mercury_5df607d6@example.com", password: "4b5d1c9da993770e9fac"})
    .then(res => console.log(res))
}, [])


  return (
    <form onSubmit={handleSubmit} className={Styles["form"]}>
      <h2 className={Styles['form__title']}>Авторизация</h2>
      <div className={Styles['form__fields']}>
        <label className={Styles['form__field']}>
          <span className={Styles['form__field-title']}>Email</span>
          <input
  onInput={handleInput}
  className={Styles["form__field-input"]}
  name="identifier"
  type="email"
  placeholder="hello@world.com"
/>
        </label>
        <label className={Styles['form__field']}>
          <span className={Styles['form__field-title']}>Пароль</span>
          <input onInput={handleInput}
  className={Styles["form__field-input"]}
  name="password"
  type="password"
  placeholder='***********'/>
        </label>
      </div>
      {message.status && (
    <p className={Styles["form__message"]}>{message.text}</p>
)} 
      <div className={Styles['form__actions']}>
        <button className={Styles['form__reset']} type="reset">Очистить</button>
        <button className={Styles['form__submit']} type="submit">Войти</button>
      </div>
    </form>
  ) 
};