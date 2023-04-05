import mongoose from "mongoose";

const Schema = mongoose.Schema;

const gameSchema = new Schema(
  {
    words: [{ type: String }],
    isOpen: {
      type: Boolean,
      default: true,
    },
    isOver: {
      type: Boolean,
      default: false,
    },
    players: [{ type: String }],
  },

  { timestamps: true, versionKey: false }
);

export const Game = mongoose.model("games", gameSchema);
