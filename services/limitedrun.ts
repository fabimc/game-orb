import { cheerio } from "https://deno.land/x/denocheerio@1.0.0/mod.ts";
import { Game } from "../types/game.type.ts";

const mapGames = (webpage: string, siteUrl: string) => {
  const $ = cheerio.load(webpage);
  const gamesSelector = $(".product-card");

  const games = gamesSelector
    .map((_i: number, el: cheerio.Element) => {
      const name = $(el).find(".title").first().text().trim();
      const image = $(el).find("img").first().attr("src");
      const url = siteUrl + $(el).find("a").first().attr("href");
      const price = $(el).find(".price").first().text();

      return { name, image, url, price };
    })
    .get();

  const singles = games.filter((game) =>
    !game.name.endsWith("Collector's Edition")
  );

  return singles as Game[];
};

export const getGames = async (limitedRunUrl: string) => {
  try {
    const limitedRunResponse = await fetch(
      `${limitedRunUrl}/collections/nintendo-switch-games`,
    );
    const limitedRunText = await limitedRunResponse.text();
    const limitedRunGames = mapGames(limitedRunText, limitedRunUrl);

    return limitedRunGames;
  } catch (error) {
    console.error("Error fetching Limited Run Games", error);
    return [];
  }
};
