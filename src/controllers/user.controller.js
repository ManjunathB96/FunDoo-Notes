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
  console.log("inside controller.....");
  try {

    const data = await UserService.newRegistration(req.body);

    console.log(data);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'User created successfully'
    });
  } catch (error) {
    console.log("controller ended");
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

//controller to login registered user
export const login = async (req, res, next) => {
  console.log("started");
  try {
    const userToken= await UserService.login(req.body);
    console.log(userToken);   
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      userToken: userToken,
      message: 'Login successfully'
    });
  } catch (error) {
    console.log("started");
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

//controller to forget password
export const forgetPwd = async (req, res, next) => {
  try {
   const data = await UserService.forgetPwd(req.body);
   console.log("forger details ",data)
   res.status(HttpStatus.OK).json({
     code: HttpStatus.OK,
     data: data,
     message: 'Email sent 👍'
   })
 } catch (error) {
   res.status(HttpStatus.BAD_REQUEST).json({
     code: HttpStatus.BAD_REQUEST,
     message: `${error}`
   })
 }
}

//Controller for reset password
export const resetPassword = async (req, res, next) => {
  try{
    const data = await UserService.resetPassword(req.body.userId,req.body);
    console.log("reset details(controller) ==>",data);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Password reset is successfully.'
    });
 }  catch (error){
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    })
  }
};






















