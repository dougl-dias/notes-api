import express from 'express'

import * as controller from '../controllers/user.controller.js'

const userRouter = express.Router()

userRouter.route('/').get(controller.getAll).post(controller.create)

userRouter
  .route('/:id')
  .get(controller.getById)
  .patch(controller.update)
  .delete(controller.remove)

export default userRouter
