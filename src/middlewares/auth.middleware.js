import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { log } from 'winston';

/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const userAuth = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken)throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    bearerToken = bearerToken.split(' ')[1];

    const user = await jwt.verify(bearerToken, process.env.SECRET_KEY);
    req.body.userId = user._id;
   // req.body.userId = user.email;
    next();
  } catch (error) {
    res.status(HttpStatus.UNAUTHORIZED).json({
      code: HttpStatus.UNAUTHORIZED,
      message: `${error}`
    });
  }
};


export const resetAuthorization = async (req, res, next) => {
  try {
    let bearertoken = req.params.token;
    if (!bearertoken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: `token is required for Authorization.`
      };
    const user = await jwt.verify(bearertoken, process.env.RESET_KEY);
   // req.body.userId = user._id;
    req.body.userId = user.email;
    next();
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `UnAuthorised token used.`
    });
  }
};
