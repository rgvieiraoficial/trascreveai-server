import { BotMessagesTemplatesRepository } from '../../../bot/repositories/implementations/BotMessagesTemplatesRepository';
import { ContactsRepository } from '../../../contacts/repositories/implementations/ContactsRepository';

import { ReceiveTextMessageUseCase } from './ReceiveTextMessageUseCase';

import { ReceiveTextMessageController } from './ReceiveTextMessageController';

const botMessagesTemplatesRepository = new BotMessagesTemplatesRepository();

const contactsRepository = new ContactsRepository();

const receiveTextMessageUseCase = new ReceiveTextMessageUseCase(botMessagesTemplatesRepository, contactsRepository);

const receiveTextMessageController = new ReceiveTextMessageController(receiveTextMessageUseCase);

export { receiveTextMessageController };