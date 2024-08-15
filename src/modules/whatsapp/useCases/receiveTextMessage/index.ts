import { BotMessagesTemplatesRepository } from '../../../bot/repositories/implementations/BotMessagesTemplatesRepository';

import { ReceiveTextMessageUseCase } from './ReceiveTextMessageUseCase';

import { ReceiveTextMessageController } from './ReceiveTextMessageController';

const botMessagesTemplatesRepository = new BotMessagesTemplatesRepository();

const receiveTextMessageUseCase = new ReceiveTextMessageUseCase(botMessagesTemplatesRepository);

const receiveTextMessageController = new ReceiveTextMessageController(receiveTextMessageUseCase);

export { receiveTextMessageController };