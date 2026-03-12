import {
  createUser,
  deleteUser,
  findAllUsers,
  findUserById,
  updateUser
} from '../services/user.service.js'

import { idSchema, updateUserSchema, userSchema } from '../schema/schemas.js'

import type { Request, Response } from 'express'

const getAll = async (req: Request, res: Response) => {
  try {
    const response = await findAllUsers()
    return res.status(200).json(response)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: error })
  }
}

const getById = async (req: Request, res: Response) => {
  try {
    const id = idSchema.parse(req.params.id)

    const response = await findUserById(id)

    if (!response) {
      return res.status(404).json({ message: 'Usuário não encontrado' })
    }

    return res.status(200).json(response)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: error })
  }
}

const create = async (req: Request, res: Response) => {
  try {
    const data = userSchema.parse(req.body)

    const response = await createUser(data)

    return res.status(201).json(response)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: error })
  }
}

const update = async (req: Request, res: Response) => {
  try {
    const id = idSchema.parse(req.params.id)
    const data = updateUserSchema.parse(req.body)

    const response = await updateUser(id, data)

    if (!response) {
      return res.status(404).json({ message: 'Usuário não encontrado' })
    }

    return res.status(200).json(response)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: error })
  }
}

const remove = async (req: Request, res: Response) => {
  try {
    const id = idSchema.parse(req.params.id)

    const response = await deleteUser(id)

    if (!response) {
      return res.status(404).json({ message: 'Usuário não encontrado' })
    }

    return res.status(204).send()
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: error })
  }
}

export { getAll, getById, create, update, remove }
