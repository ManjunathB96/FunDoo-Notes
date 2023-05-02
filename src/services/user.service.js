import User from '../models/user.model';
const bcrypt = require('bcrypt');
import * as utils from '../utils/app.util';

import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
//import * as producer from '../utils/producer';
//import * as rabbit from '../utils/send';
import * as rabbit from '../utils/rabbitmq';


export const newRegistration = async (body) => {
  if (body.password !== body.confirm_password) {
    throw new Error(
      'Password and confirm password must be same'
    );
  }
  const result = await User.findOne({ email: body.email });
  if (result == null) {
    const saltRounds = 10;
    const hashpassword = bcrypt.hashSync(body.password, saltRounds);
    body.password = hashpassword;
    const data = await User.create(body);
    const dataRabbit=JSON.stringify(data);          
    rabbit.producer('RegistrationData',dataRabbit);
    return data;
  } else {
    throw new Error('User already registered');
  }
};

//get all users
export const getAllUsers = async () => {
  const data = await User.find();
  return data;
};


//user login
export const login = async (body) => {
  const data = await User.findOne({ email: body.email });
  if (!data) {
    throw new Error('Invalid email id');
  }
  if (!bcrypt.compareSync(body.password, data.password)) {
    throw new Error('Invalid password');
  }
  const token = jwt.sign({ email: data.email, role: data.role, _id: data._id }, process.env.SECRET_KEY);
  return token;
};

// user forget password

export const forgetPwd = async (body) => {
  const data = await User.findOne({ email: body.email });
  if (data !== null) {
    const token = await jwt.sign(
      { email: data.email, _id: data._id },
      process.env.RESET_KEY
    );
    const send = await utils.sendMail(data.email, token);
    return send;
  } else {
    throw new Error('Email not found 👎');
  }
};

//reset password
export const resetPassword = async (userId, body) => {
  const saltRounds = 10;
  const pwdHash = await bcrypt.hashSync(body.password, saltRounds);
  body.password = pwdHash;
  const data = await User.findByIdAndUpdate({_id:userId},body,{ new: true });
  if (!data) {
    throw new Error('Reset Password Failed!');
  } else {
    return data;
  }
};
