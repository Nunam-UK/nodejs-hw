import createError from 'http-errors';
import { Note } from '../models/note.js';

export const getAllNotes = async (req, res) => {
  const { page = 1, perPage = 10, tag, search } = req.query;
  const userId = req.user._id;

  const limit = parseInt(perPage);
  const skip = (parseInt(page) - 1) * limit;

  const filter = { userId };

  if (tag) {
    filter.tag = tag;
  }

  if (search) {
    filter.$text = { $search: search };
  }

  const [totalNotes, notes] = await Promise.all([
    Note.countDocuments(filter),
    Note.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 }),
  ]);

  const totalPages = Math.ceil(totalNotes / limit);

  res.status(200).json({
    page: parseInt(page),
    perPage: limit,
    totalNotes,
    totalPages,
    notes,
  });
};

export const getNoteById = async (req, res) => {
  const { noteId } = req.params;
  const userId = req.user._id;

  // Шукаємо нотатку за ID ТА за власником
  const note = await Note.findOne({ _id: noteId, userId });

  if (!note) {
    throw createError(404, 'Note not found');
  }
  res.status(200).json(note);
};

export const createNote = async (req, res) => {
  // При створенні примусово додаємо userId
  const note = await Note.create({ ...req.body, userId: req.user._id });
  res.status(201).json(note);
};

export const updateNote = async (req, res) => {
  const { noteId } = req.params;
  const userId = req.user._id;

  // Оновлюємо тільки якщо id нотатки і id власника збігаються
  const note = await Note.findOneAndUpdate({ _id: noteId, userId }, req.body, {
    returnDocument: 'after',
    runValidators: true,
  });

  if (!note) {
    throw createError(404, 'Note not found');
  }
  res.status(200).json(note);
};

export const deleteNote = async (req, res) => {
  const { noteId } = req.params;
  const userId = req.user._id;

  // Видаляємо тільки якщо це нотатка цього юзера
  const note = await Note.findOneAndDelete({ _id: noteId, userId });

  if (!note) {
    throw createError(404, 'Note not found');
  }

  res.status(200).json(note);
};
