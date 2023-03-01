
import Note from '../models/note.model';



//create new note
export const newNote = async (body) => {
  const data = await Note.create(body);
  return data;
};

//to get all  notes
export const getAllNotes = async () => {
  const data = await Note.find();
  return data;
};

//get single note
export const getNote = async (id) => {
  const data = await Note.findById(id);
  return data;
};