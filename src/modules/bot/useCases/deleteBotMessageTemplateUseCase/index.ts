import { BotMessagesTemplatesRepository } from '../../repositories/implementations/BotMessagesTemplatesRepository';

import { DeleteBotMessageTemplateUseCase } from './DeleteBotMessageTemplateUseCase';

import { DeleteBotMessageTemplateController } from './DeleteBotMessageTemplateController';

const botMessagesTemplatesRepository = new BotMessagesTemplatesRepository();

const deleteBotMessageTemplateUseCase = new DeleteBotMessageTemplateUseCase(botMessagesTemplatesRepository);

const deleteBotMessageTemplateController = new DeleteBotMessageTemplateController(deleteBotMessageTemplateUseCase);

export { deleteBotMessageTemplateController };