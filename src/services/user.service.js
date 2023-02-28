import User from '../models/user.model';
const bcrypt = require('bcrypt');
import * as utils from '../utils/user.util';
import HttpStatus from 'http-status-codes';

//create new user : using user model
export const newRegistration = async (body) => {
  var status;
  if (body.password !== body.confirm_password) {
    throw new Error(
      'Password not matching re-enter password and confirm password'
    );
  }
  const result = await User.findOne({ email: body.email });
  if (result == null) {
    const saltRounds = 10; //saltround : 1) to overcome rainbow tables problem. 2)it is a cost factor that controls how much time is needed to cal a singal bcrypt hash
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashpassword = bcrypt.hashSync(body.password, salt);
    body.password = hashpassword; // Store hash in your password DB.
    const data = await User.create(body);
    status = {
      code: HttpStatus.CREATED,
      data: data,
      message: 'User created successfully'
    };
  } else {
    status = {
      code: HttpStatus.BAD_REQUEST,
      data: 'data',
      message: 'User already registered'
    };
  }
  return status;
};

//login :the user info will get from email
export const login = async (body) => {
  const data = await User.findOne({ email: body.email });
  console.log(data);
  if (data) {
    const isMatch = bcrypt.compareSync(body.password, data.password);
    if (isMatch) {
      return data;
    } else {
      throw new Error('Invalid Password');
    }
  } else {
    throw new Error('Invalid Email');
  }
};
