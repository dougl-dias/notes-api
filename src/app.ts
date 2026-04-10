import express from 'express'
import type { Request, Response } from 'express'

import cors from 'cors'

import noteRouter from './routes/note.route.js'
import userRouter from './routes/user.route.js'

import { errorMiddleware } from './middleware/error.middleware.js'

// Inicialização
const app = express()

app.use(cors())

app.use(express.json())

// Rotas
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' })
})

app.use('/notes', noteRouter)
app.use('/users', userRouter)

app.use(errorMiddleware)

export default app
