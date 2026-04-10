import {
  createNote,
  deleteNote,
  findAllNotes,
  findNoteById,
  updateNote
} from '../services/note.service.js'

import { idSchema, noteFilterSchema, noteSchema, updateNoteSchema } from '../schema/schemas.js'

import type { NextFunction, Request, Response } from 'express'

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filters = noteFilterSchema.parse(req.query)

    const response = await findAllNotes(filters)

    return res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = idSchema.parse(req.params.id)

    const response = await findNoteById(id)

    return res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = noteSchema.parse(req.body)

    const response = await createNote(data)
    return res.status(201).json(response)
  } catch (error) {
    next(error)
  }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = idSchema.parse(req.params.id)
    const data = updateNoteSchema.parse(req.body)

    const response = await updateNote(id, data)

    return res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}

const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = idSchema.parse(req.params.id)

    await deleteNote(id)

    return res.status(204).send()
  } catch (error) {
    next(error)
  }
}

export { getAll, getById, create, update, remove }
