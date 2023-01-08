import { Request, Response } from 'express'
import { UpdateUserBioUseCase } from './UpdateUserBioUseCase'

export class UpdateUserBioController {
  async handle(request: Request, response: Response) {
    const { user_id } = request
    const { bio } = request.body

    const updateUserBioUseCase = new UpdateUserBioUseCase()
    const result = await updateUserBioUseCase.execute({ user_id, bio })

    return response.json(result)
  }
}
