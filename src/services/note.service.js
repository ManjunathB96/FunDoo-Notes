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
export const getAllNotes = async () => {
  const data = await Note.find();
  if (!data) {
    throw new Error('Fetching  all notes failed!');
  } else {
    return data;
};
 }
  

//get single note
export const getNote = async (id) => {
  const data = await Note.findById(id);
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