import { prisma } from '../../../../database/prismaClient'

export class GetLinksUseCase {
  async execute(user_id: string) {
    const links = await prisma.link.findMany({
      where: {
        user_id,
      },
      select: {
        id: true,
        label: true,
        url: true,
      },
    })

    return links
  }
}
