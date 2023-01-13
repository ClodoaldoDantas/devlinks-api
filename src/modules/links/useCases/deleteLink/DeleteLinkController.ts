import { Request, Response } from 'express'
import { DeleteLinkUseCase } from './DeleteLinkUseCase'

export class DeleteLinkController {
  async handle(request: Request, response: Response) {
    const { id: link_id } = request.params

    const deleteLinkUseCase = new DeleteLinkUseCase()
    await deleteLinkUseCase.execute(link_id)

    return response.status(204).send()
  }
}
