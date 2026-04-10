import type { Request, Response, NextFunction } from 'express'

export class ApiError extends Error {
  public readonly statusCode: number

  constructor(message: string, status: number) {
    super(message)
    this.statusCode = status
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string) {
    super(message, 404)
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string) {
    super(message, 400)
  }
}

export const errorMiddleware = (
  err: Error & Partial<ApiError>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err)

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      message: err.message
    })
  }

  const statusCode = err.statusCode ?? 500
  const message = err.message ?? 'Internal server error'

  return res.status(statusCode).json({ message })
}
