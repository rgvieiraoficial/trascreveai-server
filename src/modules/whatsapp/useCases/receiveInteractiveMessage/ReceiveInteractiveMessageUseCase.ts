import { Contact, SessionTasks } from '@prisma/client';

import { IBotMessagesTemplatesRepository } from '../../../bot/repositories/IBotMessagesTemplatesRepository';
import { IContactsRepository } from '../../../contacts/repositories/IContactsRepository';
import { ISessionTasksRepository } from '../../../sessions_tasks/repositories/ISessionTasksRepository';

import { IMessageContent } from '../../types/whastsappTypes';

import markMessageAsRead from '../../utils/markMessageAsRead';
import sendMessageToWhatsAppContact from '../../utils/sendMessageToWhatsAppContact';

interface IRequest {
  name: string;
  phone_number_id: string;
  from: string;
  message_id: string;
  message_body: string;
}

class ReceiveInteractiveMessageUseCase {

  constructor(
    private botsMessagesTemplatesRepository: IBotMessagesTemplatesRepository,
    private contactsRepository: IContactsRepository,
    private sessionsTasksRepository: ISessionTasksRepository
  ) { }

  async execute({ name, phone_number_id, from, message_id, message_body }: IRequest): Promise<void> {
    console.log(`ID: ${message_id}`);

    console.log(`Body: ${message_body}`);

    await markMessageAsRead(phone_number_id, message_id);

    const contactExists = await this.contactsRepository.findByWhatsAppNumber(from);

    let contact: Contact = null;

    if (!contactExists) {
      contact = await this.contactsRepository.create({
        name,
        whatsapp_number: from,
      });
    } else {
      contact = contactExists;
    }

    let session_task: SessionTasks = null;

    const sessionTaskExists = await this.sessionsTasksRepository.findOpenSessionTasksByContact(contact.id);

    if (!sessionTaskExists || sessionTaskExists.status === 2) {
      session_task = await this.sessionsTasksRepository.create({
        status: 1,
        stage: 'welcome-message',
        contact: {
          connect: {
            id: contact.id
          }
        }
      });
    } else {
      session_task = sessionTaskExists;
    }

    let message_type: string = '';

    if (session_task.stage === 'welcome-message') {
      message_type = 'welcome-message';

      await this.sessionsTasksRepository.updateStage(session_task.id, 'initial_list_menu');
    } else if (session_task.stage === 'initial_list_menu') {
      if (message_body === 'btn_transcribe_audio') {
        message_type = 'transcribe-audio-message';

        await this.sessionsTasksRepository.updateStage(session_task.id, 'transcribe_audio_message');
      }
    }

    const getBotMessageToSend = await this.botsMessagesTemplatesRepository.findByType(message_type);

    const botMessages: IMessageContent[] = getBotMessageToSend.content as {} as IMessageContent[];

    await sendMessageToWhatsAppContact(phone_number_id, contact.whatsapp_number, botMessages);
  }
}

export { ReceiveInteractiveMessageUseCase };