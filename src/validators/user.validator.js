import Joi from '@hapi/joi';

export const newUserValidator = (req, res, next) => {
  const schema = Joi.object({
    userId:Joi.string().optional(),
    firstName: Joi.string()
      .regex(/^[A-Z]{1,1}[a-z]{3,20}$/)
      .trim()
      .required(),
    lastName: Joi.string()
      .regex(/^[A-Z]{1,1}[a-z]{3,15}$/)
      .trim()
      .required(),
    email: Joi.string()
      .regex(
        /^([a-zA-Z]{3,}([.|_|+|-]?[a-zA-Z0-9]+)?[@][a-zA-Z0-9]+[.][a-zA-Z]{2,3}([.]?[a-zA-Z]{2,3})?)$/
      )
      .trim()
      .required(),
    password: Joi.string()
      .regex(/^((?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*+?~])(?=.*[0-9]).{8,})$/)
      .trim()
      .required(),
    confirm_password: Joi.string().required()
  });
  const { error } = schema.validate(req.body);
  console.log("error data ==>",error);
  if (error) {
    next(error);
  } else {
    next();
  }
};
