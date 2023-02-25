import Joi from "joi";

export const registerValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: error.message,
    });
  }

  next();
};

export const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: error.message,
    });
  }

  next();
};

export const addTestValidation = (req, res, next) => {
  const schema = Joi.object({
    wpm: Joi.number().required(),
    accuracy: Joi.number().required(),
    time: Joi.number().required(),
    testType: Joi.number().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: error.message,
    });
  }

  next();
};
