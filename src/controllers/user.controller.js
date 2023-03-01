import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';
const bcrypt = require('bcrypt');

/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */

export const newRegistration = async (req, res, next) => {
  try {
    const data = await UserService.newRegistration(req.body);
    console.log(data);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'User created successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

export const login = async (req, res, next) => {
  try {
    const userToken= await UserService.login(req.body);
    console.log(userToken);   
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      userToken: userToken,
      message: 'Login successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};
