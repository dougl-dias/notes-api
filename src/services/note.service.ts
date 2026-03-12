import { prisma } from '../lib/prisma.js'

import type { Note } from '../generated/prisma/client.js'
import type { CreateNoteDTO, UpdateNoteDTO } from '../schema/schemas.js'

const findAllNotes = async (): Promise<Note[]> => {
  return prisma.note.findMany()
}

const findNoteById = async (id: number): Promise<Note | null> => {
  return prisma.note.findUnique({
    where: { id }
  })
}

const createNote = async (data: CreateNoteDTO): Promise<Note> => {
  return prisma.note.create({
    data
  })
}

const updateNote = async (id: number, data: UpdateNoteDTO): Promise<Note | null> => {
  const note = await findNoteById(id)
  if (!note) return null

  return prisma.note.update({
    where: { id },
    data
  })
}

const deleteNote = async (id: number): Promise<Note | null> => {
  const note = await findNoteById(id)
  if (!note) return null

  return prisma.note.delete({
    where: { id }
  })
}

export { findAllNotes, findNoteById, createNote, updateNote, deleteNote }
