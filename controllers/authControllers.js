import { getCurrentUser, login, register } from "../services/authService.js";

export const registerController = async (req, res, next) => {
  try {
    const data = await register(req.body);
    data
      ? res.status(201).json({
          user: {
            name: data.newUser.name,
            email: data.newUser.email,
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
          },
        })
      : res.status(401).json({
          message: "Not authorized",
        });
  } catch (error) {
    next(err);
  }
};
