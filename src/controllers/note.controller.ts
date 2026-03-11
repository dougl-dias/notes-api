import {
  createNote,
  deleteNote,
  findAllNotes,
  findNoteById,
  updateNote
} from '../services/notes.service.js'

import type { Request, Response } from 'express'
import type { NoteDTO, UserId } from '../schema/note.schema.js'

const allowedFields = ['title', 'content', 'category', 'color']

const parseId = (id: string | string[] | undefined): number | null => {
  const parsedId = Number(id)

  if (isNaN(parsedId) || parsedId < 0) {
    return null
  }

  return parsedId
}

const getAll = async (req: Request, res: Response) => {
  try {
    const response = await findAllNotes()
    return res.status(200).json(response)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: error })
  }
}

const getById = async (req: Request, res: Response) => {
  try {
    const id = parseId(req.params.id)

    if (!id) return res.status(400).json({ message: 'ID Inválido' })

    const response = await findNoteById(id)

    if (!response) {
      return res.status(404).json({ message: 'Anotação não encontrada' })
    }

    return res.status(200).json(response)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: error })
  }
}

const create = async (req: Request, res: Response) => {
  try {
    const body: NoteDTO & UserId = { ...req.body }

    if (body.title === undefined) {
      return res.status(400).json({ message: 'Título é obrigatório' })
    }

    if (body.category === undefined) {
      return res.status(400).json({ message: 'Categoria é obrigatório' })
    }

    if (body.userId === undefined) {
      return res.status(400).json({ message: 'ID do usuário é obrigatório' })
    }

    const data: NoteDTO & UserId = {
      ...body,
      content: body.content ?? '',
      color: body.color
    }

    const response = await createNote(data)

    return res.status(201).json(response)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: error })
  }
}

const update = async (req: Request, res: Response) => {
  try {
    const id = parseId(req.params.id)

    if (!id) return res.status(400).json({ message: 'ID Inválido' })

    const data: Partial<NoteDTO> = Object.fromEntries(
      Object.entries(req.body).filter(([key]) => allowedFields.includes(key))
    )

    const response = await updateNote(id, data)

    if (!response) {
      return res.status(404).json({ message: 'Anotação não encontrada' })
    }

    return res.status(200).json(response)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: error })
  }
}

const remove = async (req: Request, res: Response) => {
  const id = parseId(req.params.id)

  if (!id) return res.status(400).json({ message: 'ID Inválido' })

  const response = await deleteNote(id)

  if (!response) {
    return res.status(404).json({ message: 'Anotação não encontrada' })
  }

  return res.status(204).send()
}

export { getAll, getById, create, update, remove }
