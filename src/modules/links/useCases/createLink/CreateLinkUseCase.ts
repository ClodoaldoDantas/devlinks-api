import { prisma } from '../../../../database/prismaClient'

interface ICreateLink {
  label: string
  url: string
  user_id: string
}

export class CreateLinkUseCase {
  async execute({ label, url, user_id }: ICreateLink) {
    const link = await prisma.link.create({
      data: {
        label,
        url,
        user_id,
      },
    })

    return link
  }
}
