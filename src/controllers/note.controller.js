import HttpStatus from 'http-status-codes';
import { log } from 'winston';
import * as noteService from '../services/note.service';


/**
 * Controller to create a new Note
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const newNote = async (req, res, next) => {
  try {
    const data = await noteService.newNote(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Note created successfully'
    });
  } catch (error) {
    next(error);
  }
};



