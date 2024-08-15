import { AxiosResponse } from 'axios';

import { Contact } from '@prisma/client';

import { IBotMessagesTemplatesRepository } from '../../../bot/repositories/IBotMessagesTemplatesRepository';
import { IContactsRepository } from '../../../contacts/repositories/IContactsRepository';

import { graphApi } from '../../../../lib/graphApi';

import { IMessageContent, ISendMessageData } from '../../types/whastsappTypes';

interface IRequest {
  name: string;
  phone_number_id: string;
  from: string;
  message_id: string;
  message_body: string;
}

class ReceiveTextMessageUseCase {

  constructor(
    private botsMessagesTemplatesRepository: IBotMessagesTemplatesRepository,
    private contactsRepository: IContactsRepository
  ) { }

  async execute({ name, phone_number_id, from, message_id, message_body }: IRequest): Promise<void> {
    console.log(`ID: ${message_id}`);

    console.log(`Body: ${message_body}`);

    const token = process.env.WHATSAPP_TOKEN;

    const url = `/${phone_number_id}/messages?access_token=${token}`;

    const header_config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    const read_data: ISendMessageData = {
      messaging_product: "whatsapp",
      status: "read",
      message_id,
    };

    try {
      await graphApi.post<ISendMessageData, AxiosResponse<ISendMessageData>>(url, read_data, header_config);
    } catch (err) {
      console.log(err.message);
    }

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

    const getBotMessageToSend = await this.botsMessagesTemplatesRepository.findByType('welcome-message');

    const botMessages: IMessageContent[] = getBotMessageToSend.content as {} as IMessageContent[];

    const promises = [];

    botMessages.forEach(async message => {
      let reply_message: ISendMessageData = null;

      if (message.type === 'text') {
        reply_message = {
          messaging_product: "whatsapp",
          to: contact.whatsapp_number,
          text: {
            body: message.body.text
          },
        };
      }

      if (message.type === 'button') {
        reply_message = {
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: contact.whatsapp_number,
          type: "interactive",
          interactive: {
            type: message.type,
            body: message.body,
            action: message.action
          }
        }
      }

      if (message.type === 'list') {
        reply_message = {
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: contact.whatsapp_number,
          type: "interactive",
          interactive: {
            type: message.type,
            body: message.body,
            footer: message.footer,
            action: message.action
          }
        }
      }

      try {
        const response = await graphApi.post<ISendMessageData, AxiosResponse<ISendMessageData>>(url, reply_message);
        promises.push(response);
      } catch (err) {
        console.log(err.message);
      }
    });

    await Promise.all(promises);
  }
}

export { ReceiveTextMessageUseCase };