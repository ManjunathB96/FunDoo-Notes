import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';

/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */

export const newRegistration = async (req, res, next) => {
  try {
    if (req.body.password !== req.body.confirm_password) {
      res.status(HttpStatus.UNAUTHORIZED).json({
        code: HttpStatus.UNAUTHORIZED, //401 client request has not been completed bcz it lacks valid authentication credentials for the requested resource
        data: "data",
        message: 'Password not matching re-enter password and confirm password'
      });
    }
    const data = await UserService.newUser(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,  //201 CREATED :indicates that the request has succeeded and has led to the creation of a resource
      data: data,
      message: 'User created successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const data = await UserService.login(req.body.email);
    if (!data) {                               
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,     // 400 BAD_REQUEST:server can't process the request due to somthing i.e perceived to be a client error
        data: "data",
        message: 'Invalid Email...'
      });
    } else if (data.password !== req.body.password ) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        data: "data",
        message: 'Invalid password try again....'
      });
    } else {
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,    //200 OK: means the request was successfully received ,understood and accepted
        data: data,
        message: 'Login Successfull'
      });
    }
  } catch (error) {
    next(error);
  }
};
