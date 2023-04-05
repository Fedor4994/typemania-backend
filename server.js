import app from "./app.js";
import connection from "./db/connection.js";
import http from "http";
import { Server } from "socket.io";
import { User } from "./db/userModel.js";
import { Game } from "./db/gameModel.js";

const PORT = process.env.PORT || 8080;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("CREATE_GAME", async ({ userId, words }) => {
    try {
      const leaderUser = await User.findByIdAndUpdate(
        userId,
        {
          isPartyLeader: true,
          isFinishGame: false,
          currentWordIndex: 0,
        },
        { new: true }
      );

      const newGame = new Game({
        words,
        players: [leaderUser._id],
      });
      const game = await newGame.save();

      const gameID = game._id.toString();
      socket.join(gameID);
      io.to(gameID).emit("UPDATE_GAME", game);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("JOIN_GAME", async ({ userId, gameID }) => {
    try {
      let game = await Game.findById(gameID);
      if (game.isOpen) {
        const gameID = game._id.toString();
        socket.join(gameID);

        const joinedUser = await User.findByIdAndUpdate(
          userId,
          {
            isPartyLeader: false,
            isFinishGame: false,
            currentWordIndex: 0,
          },
          { new: true }
        );

        if (!game.players.includes(userId)) {
          game.players.push(joinedUser._id);
          game = await game.save();
        }

        io.to(gameID).emit("UPDATE_GAME", game);
      }
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("TIMER", async ({ userId, gameID }) => {
    let countDown = 5;
    let game = await Game.findById(gameID);
    const player = await User.findById(userId);
    console.log("timer");

    if (player.isPartyLeader) {
      console.log(countDown);
      let intervalId = setInterval(async () => {
        if (countDown >= 0) {
          io.to(gameID).emit("TIMER", countDown.toString());
          countDown--;
        } else {
          game.isOpen = false;
          game = await game.save();
          io.to(gameID).emit("UPDATE_GAME", game);
          clearInterval(intervalId);
        }
      }, 1000);
    }
  });

  socket.on("UPDATE_INPUT", async (totalTyped, userId, gameID) => {
    const player = await User.findByIdAndUpdate(
      userId,
      {
        currentWordIndex: totalTyped,
      },
      { new: true }
    );

    io.to(gameID).emit("UPDATE_PLAYER", player);
  });

  let usedUserId = "";

  socket.on("FINISH_GAME", async (userResults, gameID, userId) => {
    let game = await Game.findById(gameID);
    const currentPlayer = await User.findById(userId);

    if (
      currentPlayer &&
      !currentPlayer.isFinishGame &&
      usedUserId.toString() !== currentPlayer._id.toString()
    ) {
      usedUserId = currentPlayer._id;
      io.to(gameID).emit("PLAYER_FINISH", { userResults, userId });
      await User.findByIdAndUpdate(userId, {
        isFinishGame: true,
      });
    }

    const isAllPlayersFinish = game.players.map(async (playerId) => {
      const player = await User.findById(playerId);
      return player.isFinishGame;
    });

    let isOver = false;

    if (!game.isOver) {
      isOver = await Promise.all(isAllPlayersFinish).then((values) => {
        const result = values.every((elem) => {
          return elem === true;
        });
        return result;
      });
    }

    if (isOver) {
      game.isOver = true;
      game = await game.save();
      io.to(gameID).emit("UPDATE_GAME", game);
    }
  });

  socket.on("NEXT_GAME", async (gameID, newWords) => {
    const game = await Game.findByIdAndUpdate(
      gameID,
      {
        isOpen: true,
        isOver: false,
        words: newWords,
      },
      { new: true }
    );

    game.players.forEach(async (playerId) => {
      await User.findByIdAndUpdate(playerId, {
        isFinishGame: false,
        currentWordIndex: 0,
      });
    });

    io.to(gameID).emit("UPDATE_GAME", game);
  });

  socket.on("NEXT_GAME_SECONDARY", () => {
    usedUserId = "";
  });
});

connection
  .then(() => {
    console.log("Database connection successful");
    server.listen(PORT, function () {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  });
