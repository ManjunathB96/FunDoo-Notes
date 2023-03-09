import User from '../models/user.model';
const bcrypt = require('bcrypt');
import * as utils from '../utils/app.util';
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
  console.log("result servise ",result);
  if (result == null) {
    const saltRounds = 10; //saltround : 1) to overcome rainbow tables problem. 2)it is a cost factor that controls how much time is needed to cal a singal bcrypt hash
    // const salt = bcrypt.genSaltSync(saltRounds);
    const hashpassword = bcrypt.hashSync(body.password, saltRounds);
    body.password = hashpassword; // Store hash in your password DB.
    const data = await User.create(body);
    console.log("service data ==>",data);
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


// user forget password

export const forgetPwd = async (body) => {
  const data = await User.findOne({ email: body.email });
  console.log("User Data ==>",data);
  if(data !== null){
    const token = await jwt.sign({ email: data.email, id:data._id }, process.env.RESET_KEY);
    console.log('token ===> ',token); 
   const send = await utils.sendMail(data.email,token);
    return send;

     } else {
      throw new Error("Email not found 👎");
     }
};

//reset password
export const resetPassword = async (_id,body) =>{
const saltRounds = 12;
 const pwdHash = await bcrypt.hashSync(body.password,saltRounds);
 body.password = pwdHash; 
 const data =await User.findByIdAndUpdate(_id,{password: body.password},{new: true})
 console.log("reset details(service) ==>",data);
   
  if(!data){
    throw new Error("Reset Password Failed!")
  }
else{
  return data;
}
};























