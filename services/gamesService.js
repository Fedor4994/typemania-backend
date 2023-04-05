import { Game } from "../db/gameModel.js";

export const getGameById = async (gameId) => {
  const game = await Game.findById(gameId);
  return game;
};
