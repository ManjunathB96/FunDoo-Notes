import { Schema, model } from 'mongoose';

//Defining Schema : structure of document that contains  field : value
const noteSchema = new Schema(
  {
    title: {
      type: String
    },
    description: {
      type: String
    },
    color: {
      type: String
    },
    archive: {
      type: Boolean,
      default: false
    },
    trash: {
      type: Boolean,
      default: false
    }
  },

  {
    timestamps: true,
    collection: 'Note',
    versionKey: false // to remove the "__v" :0 in response from db
  }
);

export default model('Note', noteSchema);
