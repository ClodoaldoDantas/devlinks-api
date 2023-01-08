import { Request, Response } from 'express'
import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase'

export class UpdateUserAvatarController {
  async handle(request: Request, response: Response) {
    const { user_id } = request
    const avatar = request.file?.filename

    if (!avatar) {
      return response
        .status(400)
        .json({ message: 'Envie uma imagem para upload' })
    }

    const updateUserAvatarUseCase = new UpdateUserAvatarUseCase()
    const result = await updateUserAvatarUseCase.execute({ user_id, avatar })

    return response.json(result)
  }
}
