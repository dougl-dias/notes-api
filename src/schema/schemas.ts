import z from 'zod'

import { NoteColor } from '../generated/prisma/enums.js'

const removeUndefined = (obj: object) => {
  return Object.fromEntries(Object.entries(obj).filter(([, value]) => value !== undefined))
}

// ID
export const idSchema = z.coerce.number().int().positive()

// Usuário
export const userSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6)
})
export type CreateUserDTO = z.infer<typeof userSchema>

export const updateUserSchema = userSchema.partial().transform((data) => removeUndefined(data))
export type UpdateUserDTO = z.infer<typeof updateUserSchema>

// Anotações
export const noteSchema = z.object({
  title: z.string().min(2),
  content: z
    .string()
    .nullable()
    .optional()
    .transform((v) => v ?? null),
  category: z.string(),
  color: z.enum(NoteColor),
  userId: z.number().int().positive()
})
export type CreateNoteDTO = z.infer<typeof noteSchema>

export const updateNoteSchema = noteSchema
  .omit({ userId: true })
  .partial()
  .transform((data) => removeUndefined(data))
export type UpdateNoteDTO = z.infer<typeof updateNoteSchema>
