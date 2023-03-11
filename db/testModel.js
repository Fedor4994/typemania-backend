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
    testType: {
      type: String,
      required: [true, "testType is required"],
    },
    language: {
      type: String,
      required: [true, "language is required"],
    },
    isHardcore: {
      type: Boolean,
      required: [true, "isHardcore field is required"],
    },
    isHardcore: {
      type: Boolean,
      required: [true, "isHardcore field is required"],
    },
    text: {
      type: String,
      required: [true, "text is required"],
    },
    record: {
      type: [
        {
          timestamp: Number,
          char: String,
        },
      ],
      required: true,
    },
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
    },
  },
  { timestamps: true, versionKey: false }
);

export const Test = mongoose.model("tests", testSchema);
