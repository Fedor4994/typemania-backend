import mongoose from "mongoose";

const Schema = mongoose.Schema;

const testSchema = new Schema(
  {
    wpm: {
      type: Number,
      required: [true, "Wpm is required"],
    },
    accuracy: {
      type: Number,
      required: [true, "Accuracy is required"],
    },
    time: {
      type: Number,
      required: [true, "Time is required"],
    },
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
    },
  },
  { timestamps: true, versionKey: false }
);

export const Test = mongoose.model("tests", testSchema);
