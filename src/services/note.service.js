import Note from '../models/note.model';
import { client } from '../config/redis';

//create new note
export const newNote = async (body) => {
  console.log('note service');
  const data = await Note.create(body);
  console.log('data service', data);
  if (!data) {
    throw new Error('Note creation failed');
  } else {
    client.del(body.userId, JSON.stringify(data));
    return data;
  }
};

//to get all  notes
export const getAllNotes = async (userId) => {
  const data = await Note.find({
    userId: userId,
    archive: false,
    trash: false
  });

  await client.set(userId, JSON.stringify(data));

  if (!data) {
    throw new Error('Fetching  all notes failed!');
  } else {
    return data;
  }
};

//get single note
export const getNote = async (_id, userId) => {
  try {
    const data = await Note.findOne({ _id: _id, userId: userId });
    console.log('service(get) data-------', data);
    await client.set(_id, JSON.stringify(data));
    if (!data) {
      throw new Error('Note is not available for this Id');
    } else {
      console.log('service(get 2 ) data-------', data);
      return data;
    }
  } catch (error) {
    next(error);
  }
};
//update single note
export const updateNote = async (_id, userId, body) => {
  const data = await Note.findByIdAndUpdate({ _id: _id, userId: userId }, body);
  if (!data) {
    throw new Error('Update failed! Invalid Id ');
  } else {
    client.set(data._id, JSON.stringify(data));
    return data;
  }
};

//delete single note
export const deleteNote = async (_id, userId) => {
  await Note.findOneAndDelete({ _id: _id, userId: userId });
  client.del(_id);
  return '';
};

//Note is added to Archive
export const addToArchive = async (_id, userId) => {
  const data = await Note.findByIdAndUpdate(
    { _id: _id, userId: userId },
    { archive: true },
    { new: true }
  );
  // const data = await getNote(id);
  console.log('archive (servive) data', data);
  if (!data) {
    throw new Error('Archive failed! Invalid Id ');
  } else {
    return data;
  }
};

//Note is recoverd from  Archive
export const recoverFromArchive = async (_id, userId) => {
  const data = await Note.findOneAndUpdate(
    { _id: _id, userId: userId },
    { archive: false },
    { new: true }
  );
  console.log('revover archive ==>', data);
  if (!data) {
    throw new Error('Note recovery failed!');
  } else {
    return data;
  }
};

//note is adde to trash
export const addToTrash = async (_id, userId) => {
  const data = await Note.findByIdAndUpdate(
    { _id: _id, userId: userId },
    { trash: true },
    { new: true }
  );
  if (!data) {
    throw new Error('Trash failed ! Invalid Id');
  } else {
    return data;
  }
};

//Note is recoverd from  trash

export const recoverFromTrash = async (_id, userId) => {
  const data = await Note.findOneAndUpdate(
    { _id: _id, userId: userId },
    { trash: false },
    { new: true }
  );
  if (!data) {
    throw new Error('Recovery failed ! Invalid Id');
  } else {
    return data;
  }
};

//update color
export const colorUpdate = async (_id, userId, body) => {
  const data = await Note.findOneAndUpdate({ _id: _id, userId: userId }, body, {
    new: true
  });
  if (!data) {
    throw new Error('Failed to update color');
  } else {
    return data;
  }
};
