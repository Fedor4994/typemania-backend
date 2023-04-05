import { getGameById } from "../services/gamesService.js";

export const getGameByIdController = async (req, res, next) => {
  try {
    const game = await getGameById(req.params.gameId);
    if (!game) {
      return res.status(404).json({ message: "Not found" });
    }

    game.isOpen
      ? res.json(game)
      : res.status(404).json({ message: "Game was finished" });
  } catch (error) {
    next(error);
  }
};
