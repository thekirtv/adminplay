'use client'

import { useContext } from "react";
import { AuthContext } from "@/app/context/app-context";

import { GameNotFound } from "@/app/GameNotFound/GameNotFound"
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getGameById } from "@/app/data/data-utils";
import { AuthForm } from "@/app/components/AuthForm/AuthForm"
import { Preloader } from "@/app/components/Preloader/Preloader"
import { isResponseOk } from "@/app/api/api-utils";
import { getNormalizedGameDataById, checkIfUserVoted } from "@/app/api/api-utils"
import { endpoints } from "@/app/api/config"

import { useStore } from "@/app/store/app-store";

import Styles from "./Game.module.css";

//import { ST } from "next/dist/shared/lib/utils";
//const game = getGameById(props.params.id);

export default function GamePage(props) {

  const authContext = useStore();
    
    const router = useRouter();
    const [preloaderVisible, setPreloaderVisible] = useState(true);
    const [game, setGame] = useState(null);
    const [isVoted, setIsVoted] = useState(false);

    const vote = async (url, jwt, usersArray) => {
      try {
        const response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify({ users_permissions_users: usersArray }),
        })
        if (response.status !== 200) {
          throw new Error('Ошибка голосования')
        }
        const result = await response.json()
        return result
      } catch (error) {
        return error
      }
    }

    const handleVote = async () => {
      const jwt = authContext.token;
    let usersIdArray = game.users.length
        ? game.users.map((user) => user.id)
      : [];
    usersIdArray.push(authContext.user.id);
    const response = await vote(
        `${endpoints.games}/${game.id}`,
      jwt,
      usersIdArray
    );
    if (isResponseOk(response)) {
      setGame(() => {
          return {
            ...game,
          users: [...game.users, authContext.user],
          users_permissions_users: [...game.users_permissions_users, authContext.user],
        };
      });
      setIsVoted(true);
    }
  };

    useEffect(() => {
      async function fetchData() {
        setPreloaderVisible(true);
          const game = await getNormalizedGameDataById(endpoints.games, props.params.id);
          isResponseOk(game) ? setGame(game) : setGame(null);
          setPreloaderVisible(false);
      }
      fetchData()
  }, [])

  useEffect(() => {
    authContext.user && game ? setIsVoted(checkIfUserVoted(game, authContext.user.id)) : setIsVoted(false);
}, [authContext.user, game]);


    useEffect(() => {
      async function fetchData() {
          const game = await getNormalizedGameDataById(endpoints.games, props.params.id);
          setPreloaderVisible(false);
      }
      fetchData()
  }, [])

  useEffect(() => {
    authContext.user && game ? setIsVoted(checkIfUserVoted(game, authContext.user.id)) : setIsVoted(false);
}, [authContext.user, game]); 


  return (
    <main className={Styles['main']}>
      {game ? (
        <>
          <section className={Styles['game']}>
            <iframe className={Styles['game__iframe']} src={game.link}></iframe>
          </section>
          <section className={Styles['about']}>
            <h2 className={Styles['about__title']}>{game.title}</h2>
            <div className={Styles['about__content']}>
              <p className={Styles["about__description"]}>{game.description}</p>
              <div className={Styles["about__author"]}>
                <p>Автор: <span className={Styles["about__accent"]}>{game.developer}</span></p>
              </div>
            </div>
            <div className={Styles["about__vote"]}>
              <p className={Styles["about__vote-amount"]}>За игру уже проголосовали: 
              <span className={Styles["about__accent"]}>          
                {game.users.length}
                </span></p>
                <button
  disabled={!authContext.isAuth || isVoted}
  className={`button ${Styles["about__vote-button"]}`}
  onClick={handleVote}
>
  {isVoted ? "Голос учтён" : "Голосовать"}
</button>
            </div>
          </section>
        </>
    ) : preloaderVisible ? (
           <Preloader />
    ) : (
        <section className={Styles['game']}>
            <GameNotFound/>
        </section>
    )}
    </main>
    )
      
        
    } 

//onClick={() => router.push("/registration")}
// <p className={Styles['p']}>Такой игры не существует!</p>




/*"use client"
export default function GamePage(props) {
  const params = props.params;
  console.log(params)
  return (
    <main className="main">
      <h1>Hello, world!</h1>
    </main>
  );
}*/