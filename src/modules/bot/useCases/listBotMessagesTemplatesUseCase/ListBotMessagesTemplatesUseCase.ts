import { BotMessagesTemplate } from '@prisma/client';

import { IBotMessagesTemplatesRepository } from '../../repositories/IBotMessagesTemplatesRepository';

class ListBotMessagesTemplatesUseCase {

  constructor(
    private botsMessagesTemplatesRepository: IBotMessagesTemplatesRepository
  ) { }

  async execute(): Promise<BotMessagesTemplate[]> {
    const messagesTemplates = await this.botsMessagesTemplatesRepository.list();

    return messagesTemplates;
  }
}

export { ListBotMessagesTemplatesUseCase };