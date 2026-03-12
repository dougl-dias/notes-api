import type { NoteColor } from '../generated/prisma/enums.js'

export type NoteDTO = {
  title: string
  content?: string
  category: string
  color: NoteColor
}

export type NoteUserId = {
  userId: number
}

export type UserDTO = {
  name: string
  email: string
  password: string
}
