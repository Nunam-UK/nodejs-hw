import { Router } from 'express';
import { celebrate } from 'celebrate';
import * as notesController from '../controllers/notesController.js';
import * as notesSchemas from '../validations/notesValidation.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

// Застосовуємо аутентифікацію до ВСІХ роутів нотаток
router.use(authenticate);

router.get(
  '/',
  celebrate(notesSchemas.getAllNotesSchema),
  notesController.getAllNotes,
);

router.get(
  '/:noteId',
  celebrate(notesSchemas.noteIdSchema),
  notesController.getNoteById,
);

router.post(
  '/',
  celebrate(notesSchemas.createNoteSchema),
  notesController.createNote,
);

router.patch(
  '/:noteId',
  celebrate(notesSchemas.updateNoteSchema),
  notesController.updateNote,
);

router.delete(
  '/:noteId',
  celebrate(notesSchemas.noteIdSchema),
  notesController.deleteNote,
);

export default router;
