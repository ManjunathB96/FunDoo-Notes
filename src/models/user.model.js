import { Schema, model } from 'mongoose';

//Defining Schema : structure of document that contains  field : value
const userSchema = new Schema(
  {
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
    versionKey: false // to remove the "__v" :0 in database
  }
);

export default model('User', userSchema);
