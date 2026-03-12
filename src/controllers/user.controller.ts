import {
  createUser,
  deleteUser,
  findAllUsers,
  findUserById,
  updateUser
} from '../services/user.service.js'

import { parseId } from '../util/validateId.js'

import type { Request, Response } from 'express'
import type { UserDTO } from '../schema/schemas.js'

const allowedFields = ['name', 'email', 'password']

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
    const id = parseId(req.params.id)

    if (!id) return res.status(400).json({ message: 'ID Inválido' })

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
    const data: UserDTO = { ...req.body }

    if (data.name === undefined) {
      return res.status(400).json({ message: 'Nome é obrigatório' })
    }

    if (data.email === undefined) {
      return res.status(400).json({ message: 'E-mail é obrigatório' })
    }

    if (data.password === undefined) {
      return res.status(400).json({ message: 'Senha é obrigatório' })
    }

    const response = await createUser(data)

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

    const data: Partial<UserDTO> = Object.fromEntries(
      Object.entries(req.body).filter(([key]) => allowedFields.includes(key))
    )

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
    const id = parseId(req.params.id)

    if (!id) return res.status(400).json({ message: 'ID Inválido' })

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
