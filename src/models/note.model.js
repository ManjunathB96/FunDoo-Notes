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
    },
    userId:{
      type:String
    },
    pinned:{
      type:Boolean,
      default:false
    },
    collaborator:[{
      type:String
    }]
  },

  {
    timestamps: true,
    collection: 'Note',
    versionKey: false 
  }
);

export default model('Note', noteSchema);
