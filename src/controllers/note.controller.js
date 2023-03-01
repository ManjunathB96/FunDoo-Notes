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
  try {
    const data = await NoteService.newNote(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Note created successfully'
    });
  } catch (error) {
    next(error);
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
    const data = await NoteService.getAllNotes();
    console.log("getAllNotes__",data)
    res.status(HttpStatus.OK).json({
      //  code: HttpStatus.OK,
      data: data,
      message: 'All users fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};


