import Note from '../models/note.model';

//create new note
export const newNote = async (body) => {
  const data = await Note.create(body);
  if (!data) {
    throw new Error('Note creation failed');
  } else {
    return data;
  }
};

//to get all  notes
export const getAllNotes = async (userId) => {
  const data = await Note.find(userId);
  if (!data) {
    throw new Error('Fetching  all notes failed!');
  } else {
    return data;
  }
};

//get single note
export const getNote = async (_id,userId) => {
  const data = await Note.findById(_id,userId);
  if (!data) {
    throw new Error('Note is not available for this Id');
  } else {
    return data;
  }
};

//update single note
export const updateNote = async (_id, body) => {
  const data = await Note.findByIdAndUpdate(
    {
      _id
    },
    body,
    {
      new: true
    }
  );
  if (!data) {
    throw new Error('Update failed! Invalid Id ');
  } else {
    return data;
  }
};

//delete single note
export const deleteNote = async (id) => {
  await Note.findByIdAndDelete(id);
  return '';
};

//Note is added to Archive
export const addToArchive = async (_id,userId) => {
  const data = await Note.findByIdAndUpdate({_id,userId},{new:true},{archive:true});
  // const data = await getNote(id);
  console.log('archive (servive) data', data);
  if (!data) {
    throw new Error('Archive failed! Invalid Id ');
  } else {
    return data;
  }
};


//Note is recoverd from  Archive
export const recoverArchive = async (_id,userId) => {
  const data = await addToArchive({_id,userId},{new:true},{archive:true});
  if (!data) {
    throw new Error('Note recovery failed!');
  } else {
    return data;
  }
};

