import User from '../models/user.model';
const bcrypt = require('bcrypt');
import * as utils from '../utils/user.util';
import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

//create new user : using user model
export const newRegistration = async (body) => {
  if (body.password !== body.confirm_password) {
    throw new Error(
      'Password not matching re-enter password and confirm password'
    );
  }
  const result = await User.findOne({ email: body.email });
  if (result == null) {
    const saltRounds = 10; //saltround : 1) to overcome rainbow tables problem. 2)it is a cost factor that controls how much time is needed to cal a singal bcrypt hash
    // const salt = bcrypt.genSaltSync(saltRounds);
    const hashpassword = bcrypt.hashSync(body.password, saltRounds);
    body.password = hashpassword; // Store hash in your password DB.
    const data = await User.create(body);
    return data;
  } else {
    throw new Error('User already registered');
  }
};




//login :the user info will get from email
export const login = async (body) => {
  const data = await User.findOne({ email: body.email });
  console.log(data);
  if (data) {
    const isMatch = bcrypt.compareSync(body.password, data.password);
    if (isMatch) {
      const token = jwt.sign(
        { "email": data.email, "id": data._id },
        process.env.SECRET_KEY
      );
      return token;
    } else {
      throw new Error('Invalid Password');
    }
  } else {
    throw new Error('Invalid Email');
  }
};
















// //login :the user info will get from email
// export const login = async (body) => {
//   const data = await User.findOne({ email: body.email });
//   const isMatch = bcrypt.compareSync(body.password, data.password);
//   console.log(data);
//   if (!data && !isMatch) {
//     throw new Error('Invalid Email or password');
//   }
//   const token = jwt.sign(
//     { email: data.email, id: data._id },
//     process.env.SECRET_KEY
//   );
//   console.log(token)
//   return token;
// };


//const token = jwt.sign({username:user.username, 
//         role:{name:_role.name, sections:sections_fetched}}, 'secret', {expiresIn : '24h'}, process.env.JWT_TOKEN_SECRET);