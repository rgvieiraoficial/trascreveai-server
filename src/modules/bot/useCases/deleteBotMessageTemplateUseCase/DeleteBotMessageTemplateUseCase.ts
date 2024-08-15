import { IBotMessagesTemplatesRepository } from '../../repositories/IBotMessagesTemplatesRepository';

interface IRequest {
  id: string;
}

class DeleteBotMessageTemplateUseCase {

  constructor(
    private botsMessagesTemplatesRepository: IBotMessagesTemplatesRepository
  ) { }

  async execute({ id }: IRequest): Promise<void> {
    await this.botsMessagesTemplatesRepository.delete(id);
  }
}

export { DeleteBotMessageTemplateUseCase };