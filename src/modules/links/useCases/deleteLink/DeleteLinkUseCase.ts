import { prisma } from '../../../../database/prismaClient'

export class DeleteLinkUseCase {
  async execute(link_id: string) {
    await prisma.link.delete({
      where: {
        id: link_id,
      },
    })
  }
}
