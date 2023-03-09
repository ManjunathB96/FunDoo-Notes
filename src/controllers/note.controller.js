import HttpStatus from 'http-status-codes';
import { log } from 'winston';
import * as NoteService from '../services/note.service';

/**
 * Controller to create a new Note
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const newNote = async (req, res, next) => {
  console.log("note controller");
  try {
    console.log(req.body)
    const data = await NoteService.newNote(req.body);
    console.log("data controller ==>",data);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Note created successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

/**
 * Controller to get all notes available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getAllNotes = async (req, res, next) => {
  try {
    const data = await NoteService.getAllNotes(req.body.userId);
    console.log('getAllNotes__', data);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All Notes fetched successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

/**
 * Controller to get a single note
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getNote = async (req, res, next) => {
  try {
    const data = await NoteService.getNote(req.params._id,req.body.userId);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Note fetched successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

/**
 * Controller to update a note
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const updateNote = async (req, res, next) => {
  try {
    const data = await NoteService.updateNote(req.params._id, req.body.userId,req.body);
    console.log('Updated Note', data);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'Note updated successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

/**
 * Controller to delete a note
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const deleteNote = async (req, res, next) => {
  try {
    await NoteService.deleteNote(req.params._id,req.body.userId);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: [],
      message: 'Note deleted successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

/**
 * Controller to archieve a note
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const addToarchive = async (req, res, next) => {
  try {
    const data = await NoteService.addToArchive(req.params._id,req.body.userId);
    console.log('data in archive ', data);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'Note is archived'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};


/**
 * Controller to recover  note from archive
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */

export const recoverFromArchive = async (req, res, next) => {
  console.log("revover archive controller");
  try {
    const data = await NoteService.recoverFromArchive(req.params._id,req.body.userId,{"archive":false});
    console.log("revoverarchive controller detaris ==>",data);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'Successfully note recoverd from Archive '
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

/**
 * Controller to trash a note
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */

export const addToTrash = async (req, res, next) => {
  try {
    const data = await NoteService.addToTrash(req.params._id,req.body.userId);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'Note is added to trash'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

/**
 * Controller to recover  note from trash
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */

export const recoverFromTrash = async(req,res,next)=>{
  try {
    const data=await NoteService.recoverFromTrash(req.params._id,req.body.userId,{"trash":false});
    res.status(HttpStatus.ACCEPTED).json({
      code:HttpStatus.ACCEPTED,
      data:data,
      message:'Note recoverd from trash'
    })
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code:HttpStatus.BAD_REQUEST,
      message:`${error}`
    })
  }
}

export const colorUpdate = async(req,res,next)=>{
  try {
    const data=await NoteService.colorUpdate(req.params._id,req.body.userId,req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code:HttpStatus.ACCEPTED,
      data:data,
      message:'Color updated'
    })
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code:HttpStatus.BAD_REQUEST,
      message:`${error}`
    })
  }
}