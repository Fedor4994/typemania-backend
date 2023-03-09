import {
  getCurrentUser,
  login,
  register,
  getUserById,
  updateUserName,
  getLeaderboard,
  getLeaderboardPlace,
} from "../services/authService.js";

export const registerController = async (req, res, next) => {
  try {
    const data = await register(req.body);
    data
      ? res.status(201).json({
          user: {
            name: data.newUser.name,
            email: data.newUser.email,
            createdAt: data.newUser.createdAt,
            _id: data.newUser._id,
          },
          token: data.token,
        })
      : res.status(409).json({ message: "Email in use" });
  } catch (error) {
    next(err);
  }
};

export const loginController = async (req, res, next) => {
  try {
    const data = await login(req.body);

    data
      ? res.status(200).json({
          user: {
            name: data.user.name,
            email: data.user.email,
            createdAt: data.user.createdAt,
            _id: data.user._id,
          },
          token: data.token,
        })
      : res.status(401).json({
          message: "Email or password is wrong",
        });
  } catch (err) {
    next(err);
  }
};

export const getCurrentUserController = async (req, res, next) => {
  try {
    const user = await getCurrentUser(req.user);

    user
      ? res.status(200).json({
          user: {
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            _id: user._id,
          },
        })
      : res.status(401).json({
          message: "Not authorized",
        });
  } catch (error) {
    next(err);
  }
};

export const updateUserNameController = async (req, res, next) => {
  try {
    const updatedUser = await updateUserName(req.user._id, req.body.name);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(409).json({ message: "Name in use" });
  }
};

export const getUserByIdController = async (req, res, next) => {
  try {
    const user = await getUserById(req.params.userId);
    user ? res.json(user) : res.status(404).json({ message: "Not found" });
  } catch (error) {
    next(error);
  }
};

export const getLeaderboardController = async (req, res, next) => {
  try {
    const leaderboard = await getLeaderboard();

    res.json(leaderboard.slice(0, 10));
  } catch (error) {
    next(err);
  }
};

export const getLeaderboardPlaceController = async (req, res, next) => {
  try {
    const leaderboard = await getLeaderboard();
    const place = await getLeaderboardPlace(req.params.userId, leaderboard);

    res.json({ place });
  } catch (error) {
    next(error);
  }
};
