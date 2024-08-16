import { Contact, SessionTasks } from '@prisma/client';

import { IBotMessagesTemplatesRepository } from '../../../bot/repositories/IBotMessagesTemplatesRepository';
import { IContactsRepository } from '../../../contacts/repositories/IContactsRepository';
import { ISessionTasksRepository } from '../../../sessions_tasks/repositories/ISessionTasksRepository';

import { IMessageContent } from 'modules/whatsapp/types/whastsappTypes';

import { audioTranscribe } from '../../utils/audioTranscribe';
import downloadAudioFromMeta from '../../utils/downloadAudioFromMeta';
import markMessageAsRead from '../../utils/markMessageAsRead';
import sendMessageToWhatsAppContact from '../../utils/sendMessageToWhatsAppContact';

interface IRequest {
  name: string;
  phone_number_id: string;
  from: string;
  message_id: string;
  audio: {
    id: string;
    sha256: string;
  };
}

class ReceiveAudioMessageUseCase {

  constructor(
    private botsMessagesTemplatesRepository: IBotMessagesTemplatesRepository,
    private contactsRepository: IContactsRepository,
    private sessionsTasksRepository: ISessionTasksRepository
  ) { }

  async execute({ name, phone_number_id, from, message_id, audio }: IRequest): Promise<void> {
    console.log(`ID: ${message_id}`);

    console.log(`Audio ID: ${audio.id}`);

    await markMessageAsRead(phone_number_id, message_id);

    const contactExists = await this.contactsRepository.findByPhoneNumberId(phone_number_id);

    let contact: Contact = null;

    if (!contactExists) {
      contact = await this.contactsRepository.create({
        name,
        whatsapp_number: from,
        phone_number_id,
      });
    } else {
      contact = contactExists;
    }

    let session_task: SessionTasks = null;

    const sessionTaskExists = await this.sessionsTasksRepository.findOpenSessionTasksByContact(contact.id);

    if (!sessionTaskExists || sessionTaskExists.status === 2) {
      session_task = await this.sessionsTasksRepository.create({
        status: 1,
        stage: 'trancribe_audio_message',
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

    if (session_task.stage === 'trancribe_audio_message') {
      message_type = 'trancribe-audio-message';

      await sendMessageToWhatsAppContact(phone_number_id, contact.whatsapp_number, [{
        type: 'text',
        body: {
          text: 'Transcrevendo áudio...'
        }
      }]);

      await this.sessionsTasksRepository.updateStage(session_task.id, 'transcribe_audio');

      const file_path = await downloadAudioFromMeta(phone_number_id, audio.id);

      const transcript = await audioTranscribe(file_path);

      await sendMessageToWhatsAppContact(phone_number_id, contact.whatsapp_number, [{
        type: 'text',
        body: {
          text: `*${transcript}*`
        }
      }]);

      await this.sessionsTasksRepository.updateStatus(session_task.id, 2);
    } else if (session_task.stage === 'transcribing_audio') {
      message_type = 'transcribing-audio-message';

      await sendMessageToWhatsAppContact(phone_number_id, contact.whatsapp_number, [{
        type: 'text',
        body: {
          text: 'Não sei o que responder ainda...'
        }
      }]);
    }
  }
}

export { ReceiveAudioMessageUseCase };