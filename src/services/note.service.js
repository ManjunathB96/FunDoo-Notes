import Note from '../models/note.model';

//create new note
export const newNote = async (body) => {
  console.log("note service");
  const data = await Note.create(body);
  console.log("data service",data);
  if (!data) {
    throw new Error('Note creation failed');
  } else {
    return data;
  }
};

//to get all  notes
export const getAllNotes = async (userId) => {
  const data = await Note.find({userId:userId});
  if (!data) {
    throw new Error('Fetching  all notes failed!');
  } else {
    return data;
  }
};

//get single note
export const getNote = async (_id,userId) => {
  const data = await Note.findOne({_id:_id,userId:userId});
  if (!data) {
    throw new Error('Note is not available for this Id');
  } else {
    return data;
  }
};

//update single note
export const updateNote = async (_id,userId, body) => {
  const data = await Note.findByIdAndUpdate({ _id:_id,userId:userId},body);
  if (!data) {
    throw new Error('Update failed! Invalid Id ');
  } else {
    return data;
  }
};

//delete single note
export const deleteNote = async (_id,userId) => {
  await Note.findOneAndDelete({_id:_id,userId:userId});
  return '';
};

//Note is added to Archive
export const addToArchive = async (_id,userId) => {
  const data = await Note.findByIdAndUpdate({_id:_id,userId:userId},{archive:true},{new:true});
  // const data = await getNote(id);
  console.log('archive (servive) data', data);
  if (!data) {
    throw new Error('Archive failed! Invalid Id ');
  } else {
    return data;
  }
};


//Note is recoverd from  Archive
export const recoverFromArchive = async (_id,userId) => {
  console.log("revover archive started");
  const data = await Note.findOneAndUpdate({_id:_id,userId:userId},{archive:false},{new:true});
  console.log("revover archive ==>",data);
  if (!data) {
    throw new Error('Note recovery failed!');
  } else {
    return data;
  }
};

//note is adde to trash
export const addToTrash = async (_id,userId) => {
  const data = await Note.findByIdAndUpdate({_id:_id,userId:userId},{trash:true},{new:true});
  if (!data) {
    throw new Error('Trash failed ! Invalid Id');
  } else {
    return data;
  }
};

//Note is recoverd from  trash

export const recoverFromTrash=async(_id,userId)=>{
  const data= await Note.findOneAndUpdate({_id:_id,userId:userId},{trash:false},{new:true})
  if (!data) {
    throw new Error('Recovery failed ! Invalid Id');
  } else {
    return data
  }
}

//update color
export const colorUpdate=async(_id,userId,body)=>{
  const data= await Note.findOneAndUpdate({_id:_id,userId:userId},body,{new:true})
  if (!data) {
    throw new Error('Failed to update color');
  } else {
    return data
  }
}

