import { BotMessagesTemplate, Prisma } from '@prisma/client';

interface IBotMessagesTemplatesRepository {
  create({ title, content, type }: Prisma.BotMessagesTemplateCreateInput): Promise<BotMessagesTemplate>;
  findByType(type: string): Promise<BotMessagesTemplate | null>;
  list(): Promise<BotMessagesTemplate[]>;
  delete(id: string): Promise<void>;
}

export { IBotMessagesTemplatesRepository };