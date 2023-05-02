import { Schema, model } from 'mongoose';

//Defining Schema : structure of document that contains  field : value
const userSchema = new Schema(
  {
    userId:{
      type: String
    },
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    email: {
      type: String
    },
    password: {
      type: String
    }
  },

  {
    timestamps: true,
    collection: 'User',
    versionKey: false 
  }
);

export default model('User', userSchema);
