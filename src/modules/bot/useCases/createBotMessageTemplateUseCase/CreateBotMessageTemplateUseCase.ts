import { IBotMessagesTemplatesRepository } from '../../repositories/IBotMessagesTemplatesRepository';

interface IRequest {
  title: string;
  content: string;
  type: string;
}

class CreateBotMessageTemplateUseCase {

  constructor(
    private botsMessagesTemplatesRepository: IBotMessagesTemplatesRepository
  ) { }

  async execute({ title, content, type }: IRequest): Promise<void> {
    await this.botsMessagesTemplatesRepository.create({
      title,
      content,
      type,
    });
  }
}

export { CreateBotMessageTemplateUseCase };