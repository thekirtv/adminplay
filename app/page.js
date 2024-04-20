

import { getGamesByCategory } from "./data/data-utils.js"
import { Banner } from "./components/Banner/Banner"
import { Promo } from "./components/Promo/Promo"
import { CardsList } from "./components/CardsListSection/CardsList.jsx"
import { getData } from "./api/api-utils.js";
import { getNormalizedGamesDataByCategory } from "./api/api-utils.js";
import { endpoints } from "./api/config.js";




export default async function Home() {

  const popularGames = await getNormalizedGamesDataByCategory(endpoints.games, "popular");

  const newGames = await getNormalizedGamesDataByCategory(endpoints.games, "new");

  return (
    <main className="main">
      <Banner/>
      <CardsList id="popular" title="Популярные" data={popularGames} />
      <CardsList id="new" title="Новинки" data={newGames} />
      <Promo/>
    </main>
  );
}