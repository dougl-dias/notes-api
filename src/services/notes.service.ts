import { prisma } from '../lib/prisma.js'

import type { Note } from '../generated/prisma/client.js'
import type { NoteDTO, UserId } from '../schema/note.schema.js'

const findAllNotes = async (): Promise<Note[]> => {
  return prisma.note.findMany()
}

const findNoteById = async (id: number): Promise<Note | null> => {
  return prisma.note.findUnique({
    where: { id }
  })
}

const createNote = async (data: NoteDTO & UserId): Promise<Note> => {
  const newNote: any = {
    title: data.title,
    content: data.content ?? '',
    category: data.category,
    color: data.color ?? 'gray',
    userId: Number(data.userId)
  }

  return prisma.note.create({
    data: newNote
  })
}

const updateNote = async (id: number, data: any): Promise<Note | null> => {
  const note = await findNoteById(id)

  if (!note) return null

  return prisma.note.update({
    where: { id },
    data
  })
}

const deleteNote = (id: number): Promise<Note> => {
  return prisma.note.delete({
    where: { id }
  })
}

export { findAllNotes, findNoteById, createNote, updateNote, deleteNote }
