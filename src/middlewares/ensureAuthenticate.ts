import { NextFunction, Request, Response } from 'express'

import { verify } from 'jsonwebtoken'
import { AppError } from '../errors/AppError'

export async function ensureAuthenticate(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('token missing', 401)
  }

  const [, token] = authHeader.split(' ')

  try {
    const { sub } = verify(token, process.env.AUTH_SECRET as string)
    request.user_id = sub as string

    return next()
  } catch (err) {
    throw new AppError('invalid token', 401)
  }
}
