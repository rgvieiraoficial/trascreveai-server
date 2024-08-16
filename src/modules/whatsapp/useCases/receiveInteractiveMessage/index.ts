import { BotMessagesTemplatesRepository } from '../../../bot/repositories/implementations/BotMessagesTemplatesRepository';
import { ContactsRepository } from '../../../contacts/repositories/implementations/ContactsRepository';
import { SessionTasksRepository } from '../../../sessions_tasks/repositories/implementations/SessionTasksRepository';

import { ReceiveInteractiveMessageUseCase } from './ReceiveInteractiveMessageUseCase';

import { ReceiveInteractiveMessageController } from './ReceiveInteractiveMessageController';

const botMessagesTemplatesRepository = new BotMessagesTemplatesRepository();

const contactsRepository = new ContactsRepository();

const sessionTasksRepository = new SessionTasksRepository();

const receiveInteractiveMessageUseCase = new ReceiveInteractiveMessageUseCase(botMessagesTemplatesRepository, contactsRepository, sessionTasksRepository);

const receiveInteractiveMessageController = new ReceiveInteractiveMessageController(receiveInteractiveMessageUseCase);

export { receiveInteractiveMessageController };