
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
router.get('/:_id/archive/recover',userAuth,noteController.recoverFromArchive);

//route to add note in trash using id
router.put('/:_id/trash',userAuth,noteController.addToTrash);

//route to recover note from trash using id
router.get('/:_id/trash/recover',userAuth,noteController.recoverFromTrash)

//route to change color
router.put('/:_id/color',userAuth,noteController.colorUpdate);


export default router;


