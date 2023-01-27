import { prisma } from '../../../../database/prismaClient'

interface IUpdateUserBio {
  user_id: string
  bio: string | null
}

export class UpdateUserBioUseCase {
  async execute({ user_id, bio }: IUpdateUserBio) {
    const updatedUser = await prisma.user.update({
      where: {
        id: user_id,
      },
      data: {
        bio,
      },
      select: {
        bio: true,
      },
    })

    return updatedUser
  }
}
