import { Router } from 'express';
import { celebrate } from 'celebrate';
import * as notesController from '../controllers/notesController.js';
import * as notesSchemas from '../validations/notesValidation.js';

const router = Router();

// Отримання всіх нотаток
router.get(
  '/notes',
  celebrate(notesSchemas.getAllNotesSchema),
  notesController.getAllNotes,
);

// Отримання однієї нотатки за ID
router.get(
  '/notes/:noteId',
  celebrate(notesSchemas.noteIdSchema),
  notesController.getNoteById,
);

// Створення нотатки
router.post(
  '/notes',
  celebrate(notesSchemas.createNoteSchema),
  notesController.createNote,
);

// Оновлення нотатки
router.patch(
  '/notes/:noteId',
  celebrate(notesSchemas.updateNoteSchema),
  notesController.updateNote,
);

// Видалення нотатки
router.delete(
  '/notes/:noteId',
  celebrate(notesSchemas.noteIdSchema),
  notesController.deleteNote,
);

export default router;
