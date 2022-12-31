import { Request, Response } from 'express'
import { CreateUserUseCase } from './CreateUserUseCase'

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const { username, password, bio } = request.body

    const createUserUseCase = new CreateUserUseCase()

    const user = await createUserUseCase.execute({
      username,
      password,
      bio,
    })

    return response.json(user)
  }
}
