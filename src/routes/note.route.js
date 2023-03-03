
import express from 'express';
import * as noteController from '../controllers/note.controller';
import { newNoteValidator } from '../validators/note.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to create a new note
router.post('', newNoteValidator,userAuth,noteController.newNote);

//route to get  all notes 
router.get('',userAuth, noteController.getAllNotes);

//route to get a single note by their note id
router.get('/:_id',userAuth, noteController.getNote);


//route to update a single note by their note id
router.put('/:_id',userAuth, noteController.updateNote);

//route to delete a single note by their note id
router.delete('/:_id',userAuth, noteController.deleteNote);


//route to send note to archive by id
router.put('/:_id/archive', userAuth, noteController.addToarchive);


//route get archive note
router.get('/:_id/archive/recover',userAuth,noteController.recoverArchive);


export default router;


