import { Request, Response } from 'express'
import { GetUserUseCase } from './GetUserUseCase'

export class GetUserController {
  async handle(request: Request, response: Response) {
    const { username } = request.params
    const getUserUseCase = new GetUserUseCase()

    const user = await getUserUseCase.execute(username)
    return response.json(user)
  }
}
