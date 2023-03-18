import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    avatarURL: {
      type: String,
      require: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
    achievements: {
      speed10: {
        type: Boolean,
        default: false,
      },
      speed30: {
        type: Boolean,
        default: false,
      },
      speed50: {
        type: Boolean,
        default: false,
      },
      speed70: {
        type: Boolean,
        default: false,
      },
      speed90: {
        type: Boolean,
        default: false,
      },
      speed110: {
        type: Boolean,
        default: false,
      },
      speed130: {
        type: Boolean,
        default: false,
      },
      speed150: {
        type: Boolean,
        default: false,
      },
      speed175: {
        type: Boolean,
        default: false,
      },
      speed200: {
        type: Boolean,
        default: false,
      },
      speed225: {
        type: Boolean,
        default: false,
      },
      speed250: {
        type: Boolean,
        default: false,
      },
      matches1: {
        type: Boolean,
        default: false,
      },
      matches5: {
        type: Boolean,
        default: false,
      },
      matches10: {
        type: Boolean,
        default: false,
      },
      matches25: {
        type: Boolean,
        default: false,
      },
      matches50: {
        type: Boolean,
        default: false,
      },
      matches100: {
        type: Boolean,
        default: false,
      },
      matches250: {
        type: Boolean,
        default: false,
      },
      matches500: {
        type: Boolean,
        default: false,
      },
      matches1000: {
        type: Boolean,
        default: false,
      },
      matches2500: {
        type: Boolean,
        default: false,
      },
      matches5000: {
        type: Boolean,
        default: false,
      },
      matches10000: {
        type: Boolean,
        default: false,
      },
      time1m: {
        type: Boolean,
        default: false,
      },
      time10m: {
        type: Boolean,
        default: false,
      },
      time30m: {
        type: Boolean,
        default: false,
      },
      time1h: {
        type: Boolean,
        default: false,
      },
      time6h: {
        type: Boolean,
        default: false,
      },
      time12h: {
        type: Boolean,
        default: false,
      },
      time1d: {
        type: Boolean,
        default: false,
      },
      time7d: {
        type: Boolean,
        default: false,
      },
      time14d: {
        type: Boolean,
        default: false,
      },
      time1month: {
        type: Boolean,
        default: false,
      },
      time3month: {
        type: Boolean,
        default: false,
      },
      time6month: {
        type: Boolean,
        default: false,
      },
    },
  },
  { timestamps: true, versionKey: false }
);

userSchema.pre("save", async function () {
  if (this.isNew) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

export const User = mongoose.model("users", userSchema);
