import { Request, Response } from 'express'
import { CreateLinkUseCase } from './CreateLinkUseCase'

export class CreateLinkController {
  async handle(request: Request, response: Response) {
    const { user_id } = request
    const { label, url } = request.body

    const createLinkUseCase = new CreateLinkUseCase()
    const link = await createLinkUseCase.execute({ user_id, label, url })

    return response.status(201).json(link)
  }
}
