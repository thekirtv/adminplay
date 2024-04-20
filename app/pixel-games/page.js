"use client"

import { useGetDataByCategory } from "@/app/api/api-hooks";
import { Preloader } from "@/app/components/Preloader/Preloader";
import { getGamesByCategory } from "../data/data-utils"
import { CardsList } from "../components/CardsListSection/CardsList"
import { CardsListSection } from "../components/CardsListSection/CardsListSection";
import { getNormalizedGamesDataByCategory } from "../api/api-utils"
import { endpoints } from "../api/config"

export default function Pixel ( ) {
    const pixelGames = useGetDataByCategory(endpoints.games, "pixel");
    return (
        <main className="main-inner">
          {pixelGames ? (
            <CardsListSection id="pixel" title="Пиксельные" data={pixelGames} />
          ) : (
            <Preloader />
          )}
        </main>
      );
    }