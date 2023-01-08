import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { prisma } from '../../../../database/prismaClient'
import { AppError } from '../../../../errors/AppError'
import { getAvatarURL } from '../../../../utils/file'

interface IAuthenticateUser {
  username: string
  password: string
}

export class AuthenticateUserUseCase {
  async execute({ username, password }: IAuthenticateUser) {
    const user = await prisma.user.findFirst({
      where: {
        username,
      },
    })

    if (!user) {
      throw new AppError('usuário ou senha inválidos')
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new AppError('usuário ou senha inválidos')
    }

    const token = sign({ username }, process.env.AUTH_SECRET as string, {
      subject: user.id,
      expiresIn: '1d',
    })

    return {
      user: {
        id: user.id,
        username: user.username,
        bio: user.bio,
        avatar: getAvatarURL(user.avatar),
      },
      token,
    }
  }
}
