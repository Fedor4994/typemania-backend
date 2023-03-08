import { User } from "../db/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Test } from "../db/testModel.js";

export const register = async ({ name, email, password }) => {
  const user = await User.findOne({ email });

  if (user) {
    return false;
  }

  const newUser = new User({ name, email, password });
  await newUser.save();

  const token = jwt.sign(
    {
      _id: newUser._id,
    },
    process.env.JWT_SECRET
  );

  return { newUser, token };
};

export const login = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    return false;
  }

  const isCorrectPassword = await bcrypt.compare(password, user.password);
  if (!isCorrectPassword) {
    return false;
  }

  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_SECRET
  );

  return { user, token };
};

export const getCurrentUser = async ({ _id }) => {
  const user = await User.findOne({ _id });

  if (!user) {
    return false;
  }

  return user;
};

export const getUserById = async (userId) => {
  const user = await User.findOne({ _id: userId });
  return user;
};

export const updateUserName = async (userId, newName) => {
  const updatedUser = await User.findOneAndUpdate(
    { _id: userId },
    { name: newName },
    { new: true }
  );
  return updatedUser;
};

export const getLeaderboard = async () => {
  const users = await User.find();
  const bests = [];

  for (const user of users) {
    const userGames = await Test.find({ userId: user._id });
    bests.push({
      user,
      bestsRecord: Math.max(...userGames.map((test) => test.wpm)),
    });
  }

  bests.sort((a, b) => (a.bestsRecord < b.bestsRecord ? 1 : -1));

  return bests;
};

export const getLeaderboardPlace = async (userId, leaderboard) => {
  const user = await User.findById(userId);

  let leaderboardPlace = 0;
  leaderboard.forEach((position, index) => {
    if (position.user.email === user.email) leaderboardPlace = index + 1;
  });

  return leaderboardPlace;
};
