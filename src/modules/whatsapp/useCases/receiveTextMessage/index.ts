import { BotMessagesTemplatesRepository } from '../../../bot/repositories/implementations/BotMessagesTemplatesRepository';
import { ContactsRepository } from '../../../contacts/repositories/implementations/ContactsRepository';
import { SessionTasksRepository } from '../../../sessions_tasks/repositories/implementations/SessionTasksRepository';

import { ReceiveTextMessageUseCase } from './ReceiveTextMessageUseCase';

import { ReceiveTextMessageController } from './ReceiveTextMessageController';

const botMessagesTemplatesRepository = new BotMessagesTemplatesRepository();

const contactsRepository = new ContactsRepository();

const sessionTasksRepository = new SessionTasksRepository();

const receiveTextMessageUseCase = new ReceiveTextMessageUseCase(botMessagesTemplatesRepository, contactsRepository, sessionTasksRepository);

const receiveTextMessageController = new ReceiveTextMessageController(receiveTextMessageUseCase);

export { receiveTextMessageController };