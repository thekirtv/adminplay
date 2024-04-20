"use client"

import { useGetDataByCategory } from "@/app/api/api-hooks";
import { Preloader } from "@/app/components/Preloader/Preloader";
import { getGamesByCategory } from "../data/data-utils"
import { CardsList } from "../components/CardsListSection/CardsList"
import { CardsListSection } from "../components/CardsListSection/CardsListSection";
import { endpoints } from "../api/config"
import { getNormalizedGamesDataByCategory } from "../api/api-utils" 


export default function Popular ( ) {
    const popularGames = useGetDataByCategory(endpoints.games, "popular");
    return (
        <main className="main-inner">
          {popularGames ? (
            <CardsListSection id="popular" title="Популярные" data={popularGames} />
          ) : (
            <Preloader />
          )}
        </main>
      );
    }
//const popularGames = getGamesByCategory("popular");