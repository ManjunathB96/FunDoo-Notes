import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { log } from 'winston';
//var jwt = require('jsonwebtoken');

/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

// export const userAuth = async (req, res, next) => {
//   try {
//     let bearerToken = req.headers.authorization.split(' ')[1];
//     console.log(`bearerToken  ${bearerToken}`);
//     if (!bearerToken) {
//       throw new Error('Authentication failed!');
//     }
//     // const user = jwt.verify(bearerToken, process.env.SECRET_KEY);
//     const  user  =await jwt.verify(bearerToken, process.env.SECRET_KEY);
//     console.log("user details ",user);
//     //req.body.userId =user.id
//    req.body.userId = user.email;
//     next();
//   } catch (error) {
//     res.status(HttpStatus.UNAUTHORIZED).json({
//       code: HttpStatus.UNAUTHORIZED,
//       message: `${error}`
//     });
//   }
// };
export const userAuth = async (req, res, next) => {
  console.log('auth started..');
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    bearerToken = bearerToken.split(' ')[1];

    const user = await jwt.verify(bearerToken, process.env.SECRET_KEY);
    console.log('auth token ==>', user);
    //req.body.userId = user.id;
    req.body.userId = user.email;
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
    console.log('token ===>', bearertoken);
    if (!bearertoken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: `token is required for Authorization.`
      };
    const user = await jwt.verify(bearertoken, process.env.RESET_KEY);
    req.body.userId = user.id;
    next();
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `UnAuthorised token used.`
    });
  }
};
