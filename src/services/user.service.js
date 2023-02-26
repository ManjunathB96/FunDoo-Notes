import User from '../models/user.model';

//create new user : using user model
export const newUser = async (body) => {
  const data = await User.create(body);
  return data;
};

//login :the user info will get from email
export const login = async (email) => {
  const data = await User.findOne({ email: email });
  return data;
};
