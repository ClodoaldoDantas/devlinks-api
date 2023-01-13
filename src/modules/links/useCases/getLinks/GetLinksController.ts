import { Request, Response } from 'express'
import { GetLinksUseCase } from './GetLinksUseCase'

export class GetLinksController {
  async handle(request: Request, response: Response) {
    const { user_id } = request

    const getLinksUseCase = new GetLinksUseCase()
    const links = await getLinksUseCase.execute(user_id)

    return response.json(links)
  }
}
