import type { NoteColor } from '../generated/prisma/enums.js'

export type NoteDTO = {
  title: string
  content?: string
  category: string
  color: NoteColor
}

export type UserId = {
  userId: number
}
