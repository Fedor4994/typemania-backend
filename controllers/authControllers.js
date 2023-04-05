import {
  getCurrentUser,
  login,
  register,
  getUserById,
  updateUserName,
  getLeaderboard,
  getLeaderboardPlace,
  getAchievements,
  changeUserAchievements,
  verification,
  resendEmail,
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
            avatarURL: data.newUser.avatarURL,
            verify: data.newUser.verify,
            isPartyLeader: data.newUser.isPartyLeader,
            isFinishGame: data.newUser.isFinishGame,

            currentWordIndex: data.newUser.currentWordIndex,
            _id: data.newUser._id,
          },
          token: data.token,
        })
      : res.status(409).json({ message: "Email in use" });
  } catch (error) {
    next(error);
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
            avatarURL: data.user.avatarURL,
            verify: data.user.verify,
            isPartyLeader: data.user.isPartyLeader,
            isFinishGame: data.user.isFinishGame,

            currentWordIndex: data.user.currentWordIndex,
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
            avatarURL: user.avatarURL,
            verify: user.verify,
            isPartyLeader: user.isPartyLeader,
            isFinishGame: user.isFinishGame,

            currentWordIndex: user.currentWordIndex,
            _id: user._id,
          },
        })
      : res.status(401).json({
          message: "Not authorized",
        });
  } catch (error) {
    next(error);
  }
};

export const verifyController = async (req, res, next) => {
  try {
    const verify = await verification(req.params.verificationToken);
    verify
      ? res.sendFile("/templates/success-verificatoin.html", { root: "." })
      : res
          .status(404)
          .sendFile("/templates/failed-verification.html", { root: "." });
  } catch (error) {
    next(error);
  }
};

export const resendEmailController = async (req, res, next) => {
  try {
    const verify = await resendEmail(req.body.email);
    verify
      ? res.json({ message: "Email send success" })
      : res.status(404).json({ message: "Email send failed" });
  } catch (error) {
    next(error);
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
    next(error);
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

export const getAchievementsController = async (req, res, next) => {
  try {
    const achievements = await getAchievements(req.params.userId);

    achievements
      ? res.json(achievements)
      : res.status(400).json({ message: "user not found" });
  } catch (error) {
    next(error);
  }
};

export const changeUserAchievementsController = async (req, res, next) => {
  try {
    const achievements = await changeUserAchievements(
      req.user._id,
      req.body.achievementName
    );

    achievements
      ? res.json(achievements)
      : res.status(400).json({ message: "user not found" });
  } catch (error) {
    next(error);
  }
};
