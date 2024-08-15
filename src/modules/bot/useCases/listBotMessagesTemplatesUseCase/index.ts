import { BotMessagesTemplatesRepository } from '../../repositories/implementations/BotMessagesTemplatesRepository';

import { ListBotMessagesTemplatesUseCase } from './ListBotMessagesTemplatesUseCase';

import { ListBotMessagesTemplatesController } from './ListBotMessagesTemplatesController';

const botMessagesTemplatesRepository = new BotMessagesTemplatesRepository();

const listBotMessagesTemplatesUseCase = new ListBotMessagesTemplatesUseCase(botMessagesTemplatesRepository);

const listBotMessagesTemplatesController = new ListBotMessagesTemplatesController(listBotMessagesTemplatesUseCase);

export { listBotMessagesTemplatesController };