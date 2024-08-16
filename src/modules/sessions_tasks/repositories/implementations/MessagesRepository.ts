import { Messages, Prisma } from '@prisma/client';

import { IMessagesRepository } from '../IMessagesRepository';

import { prisma } from '../../../../lib/prisma';

class MessagesRepository implements IMessagesRepository {

  async create({ content, position, messaging_product_id, status, session_task }: Prisma.MessagesCreateInput): Promise<Messages> {

    const message = await prisma.messages.create({
      data: {
        content,
        position,
        status,
        messaging_product_id,
        session_task
      }
    });

    prisma.$disconnect();

    return message;
  }

  async list(sessionTaskId: string): Promise<Messages[]> {
    const messages = await prisma.messages.findMany({
      where: {
        sessionTaskId
      }
    });

    prisma.$disconnect();

    return messages;
  }
}

export { MessagesRepository }