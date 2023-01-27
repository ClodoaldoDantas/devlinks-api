import { Request, Response } from 'express'
import { GetUserUseCase } from './GetUserUseCase'

export class GetUserController {
  async handle(request: Request, response: Response) {
    const { id: user_id } = request.params
    const getUserUseCase = new GetUserUseCase()

    const user = await getUserUseCase.execute(user_id)
    return response.json(user)
  }
}
