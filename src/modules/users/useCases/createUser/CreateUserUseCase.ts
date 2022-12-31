import { prisma } from '../../../../database/prismaClient'
import { AppError } from '../../../../errors/AppError'
import { hash } from 'bcrypt'

interface ICreateUser {
  username: string
  password: string
  bio?: string
}

export class CreateUserUseCase {
  async execute({ username, password, bio }: ICreateUser) {
    const userExists = await prisma.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: 'insensitive',
        },
      },
    })

    if (userExists) {
      throw new AppError('Usuário já cadastrado')
    }

    const hashPassword = await hash(password, 10)

    const user = await prisma.user.create({
      data: {
        username,
        password: hashPassword,
        bio,
      },
      select: {
        id: true,
        username: true,
        bio: true,
      },
    })

    return user
  }
}
