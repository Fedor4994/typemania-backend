import fs from "fs/promises";
import { User } from "../db/userModel.js";

export const uploadController = async (req, res, next) => {
  try {
    if (req.file) {
      const { _id } = req.user;
      const avatarURL = `avatars/${req.file.filename}`;

      fs.rename(req.file.path, `./public/avatars/${req.file.filename}`);

      await User.findOneAndUpdate(
        { _id },
        {
          avatarURL,
        }
      );

      return res.json({ avatarURL });
    }

    res.status(400).json({ message: "Not valid file" });
  } catch (error) {
    next(error);
  }
};
