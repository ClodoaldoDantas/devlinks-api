import { Request, Response } from 'express'
import { GetProfileUseCase } from './GetProfileUseCase'

export class GetProfileController {
  async handle(request: Request, response: Response) {
    const { user_id } = request
    const getUserUseCase = new GetProfileUseCase()

    const user = await getUserUseCase.execute(user_id)
    return response.json(user)
  }
}
