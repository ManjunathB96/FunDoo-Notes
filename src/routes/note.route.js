
import express from 'express';
import * as noteController from '../controllers/note.controller';
import { newNoteValidator } from '../validators/note.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to create a new note
router.post('', newNoteValidator,userAuth,noteController.newNote);

//route to get  all notes 
router.get('', noteController.getAllNotes);

export default router;


