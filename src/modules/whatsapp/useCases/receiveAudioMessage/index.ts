import { BotMessagesTemplatesRepository } from '../../../bot/repositories/implementations/BotMessagesTemplatesRepository';
import { ContactsRepository } from '../../../contacts/repositories/implementations/ContactsRepository';
import { SessionTasksRepository } from '../../../sessions_tasks/repositories/implementations/SessionTasksRepository';

import { ReceiveAudioMessageUseCase } from './ReceiveAudioMessageUseCase';

import { ReceiveAudioMessageController } from './ReceiveAudioMessageController';

const botMessagesTemplatesRepository = new BotMessagesTemplatesRepository();

const contactsRepository = new ContactsRepository();

const sessionTasksRepository = new SessionTasksRepository();

const receiveAudioMessageUseCase = new ReceiveAudioMessageUseCase(botMessagesTemplatesRepository, contactsRepository, sessionTasksRepository);

const receiveAudioMessageController = new ReceiveAudioMessageController(receiveAudioMessageUseCase);

export { receiveAudioMessageController };