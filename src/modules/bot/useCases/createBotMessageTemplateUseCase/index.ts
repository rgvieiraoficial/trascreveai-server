import { BotMessagesTemplatesRepository } from '../../repositories/implementations/BotMessagesTemplatesRepository';

import { CreateBotMessageTemplateUseCase } from './CreateBotMessageTemplateUseCase';

import { CreateBotMessageTemplateController } from './CreateBotMessageTemplateController';

const botMessagesTemplatesRepository = new BotMessagesTemplatesRepository();

const createBotMessageTemplateUseCase = new CreateBotMessageTemplateUseCase(botMessagesTemplatesRepository);

const createBotMessageTemplateController = new CreateBotMessageTemplateController(createBotMessageTemplateUseCase);

export { createBotMessageTemplateController };