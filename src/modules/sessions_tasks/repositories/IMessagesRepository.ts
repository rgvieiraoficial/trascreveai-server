import { Messages, Prisma } from '@prisma/client';

interface IMessagesRepository {
  create({ content, position, messaging_product_id, status, session_task }: Prisma.MessagesCreateInput): Promise<Messages>;
  list(session_task_id: string): Promise<Messages[] | null>;
}

export { IMessagesRepository };