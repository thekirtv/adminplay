"use client"

import { useGetDataByCategory } from "@/app/api/api-hooks";
import { Preloader } from "@/app/components/Preloader/Preloader";
import { getGamesByCategory } from "../data/data-utils"
import { CardsList } from "../components/CardsListSection/CardsList"
import { CardsListSection } from "../components/CardsListSection/CardsListSection";
import { getNormalizedGamesDataByCategory } from "../api/api-utils"
import { endpoints } from "../api/config"

export default function TDS ( ) {
    const TDSGames = useGetDataByCategory(endpoints.games, "TDS");
    return (
        <main className="main-inner">
          {TDSGames ? (
            <CardsListSection id="TDS" title="TDS" data={TDSGames} />
          ) : (
            <Preloader />
          )}
        </main>
      );
    }