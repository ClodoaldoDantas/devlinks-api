import { Request, Response } from 'express'
import { GetUserUseCase } from './GetUserUseCase'

export class GetUserController {
  async handle(request: Request, response: Response) {
    const { user_id } = request
    const getUserUseCase = new GetUserUseCase()

    const user = await getUserUseCase.execute(user_id)
    return response.json(user)
  }
}
