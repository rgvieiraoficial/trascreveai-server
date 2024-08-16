import { Message, Prisma } from '@prisma/client';

import { IMessagesRepository } from '../IMessagesRepository';

import { prisma } from '../../../../lib/prisma';

class MessagesRepository implements IMessagesRepository {

  async create({ content, position, messaging_product_id, status, call }: Prisma.MessageCreateInput): Promise<Message> {

    const message = await prisma.message.create({
      data: {
        content,
        position,
        messaging_product_id,
        status,
        call
      }
    });

    return message;
  }

  async list(callId: string): Promise<Message[] | null> {
    const messages = await prisma.message.findMany({
      where: {
        callId
      }
    });

    return messages;
  }

  async getLastMessageByCallId(callId: string): Promise<Message | null> {
    const message = await prisma.message.findFirst({
      where: {
        callId
      },
      orderBy: {
        created_at: 'desc'
      }
    });

    return message;
  }
}

export { MessagesRepository }