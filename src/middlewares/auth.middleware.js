import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
//var jwt = require('jsonwebtoken');

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
    let bearerToken = req.headers.authorization.split(' ')[1];
    if (!bearerToken) {
      throw new Error('Authentication failed!');
    }
    const verifyUser = jwt.verify(bearerToken, process.env.SECRET_KEY);
    res.verifyUser = verifyUser;
    res.token = bearerToken;
    next();
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};
