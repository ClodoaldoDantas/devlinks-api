import { prisma } from '../../../../database/prismaClient'
import { AppError } from '../../../../errors/AppError'
import { deleteFile, getAvatarURL } from '../../../../utils/file'

interface IUpdateUserAvatarUseCase {
  user_id: string
  avatar: string
}

export class UpdateUserAvatarUseCase {
  async execute({ user_id, avatar }: IUpdateUserAvatarUseCase) {
    const user = await prisma.user.findFirst({
      where: {
        id: user_id,
      },
    })

    if (!user) {
      throw new AppError('Usuário não encontrado')
    }

    if (user.avatar) {
      deleteFile(user.avatar)
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: user_id,
      },
      data: {
        avatar,
      },
      select: {
        avatar: true,
      },
    })

    return {
      avatar: getAvatarURL(updatedUser.avatar),
    }
  }
}
