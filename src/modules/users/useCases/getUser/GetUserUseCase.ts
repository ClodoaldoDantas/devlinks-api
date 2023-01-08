import { prisma } from '../../../../database/prismaClient'
import { AppError } from '../../../../errors/AppError'
import { getAvatarURL } from '../../../../utils/file'

export class GetUserUseCase {
  async execute(user_id: string) {
    const user = await prisma.user.findFirst({
      where: {
        id: user_id,
      },
      select: {
        id: true,
        username: true,
        bio: true,
        avatar: true,
      },
    })

    if (!user) {
      throw new AppError('Usuário não encontrado')
    }

    return {
      ...user,
      avatar: getAvatarURL(user.avatar),
    }
  }
}
