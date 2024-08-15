import { BotMessagesTemplate, Prisma } from '@prisma/client';

import { IBotMessagesTemplatesRepository } from '../IBotMessagesTemplatesRepository';

import { prisma } from '../../../../lib/prisma';

class BotMessagesTemplatesRepository implements IBotMessagesTemplatesRepository {

  async create({ title, content, type }: Prisma.BotMessagesTemplateCreateInput): Promise<BotMessagesTemplate> {
    const bot_message_template = await prisma.botMessagesTemplate.create({
      data: {
        title,
        content,
        type,
      }
    });

    prisma.$disconnect();

    return bot_message_template;
  }

  async findByType(type: string): Promise<BotMessagesTemplate | null> {
    const messageTemplate = await prisma.botMessagesTemplate.findFirst({
      where: {
        type,
      }
    })

    prisma.$disconnect();

    return messageTemplate;
  }

  async list(): Promise<BotMessagesTemplate[]> {
    const messagesTemplates = await prisma.botMessagesTemplate.findMany();

    prisma.$disconnect();

    return messagesTemplates;
  }

  async delete(id: string): Promise<void> {
    await prisma.botMessagesTemplate.delete({
      where: {
        id
      }
    });

    prisma.$disconnect();
  }
}

export { BotMessagesTemplatesRepository }