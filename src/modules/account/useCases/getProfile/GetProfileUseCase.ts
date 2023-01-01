import { prisma } from '../../../../database/prismaClient'
import { AppError } from '../../../../errors/AppError'

export class GetProfileUseCase {
  async execute(user_id: string) {
    const user = await prisma.user.findFirst({
      where: {
        id: user_id,
      },
      select: {
        id: true,
        username: true,
        bio: true,
      },
    })

    if (!user) {
      throw new AppError('Usuário não encontrado')
    }

    return user
  }
}
