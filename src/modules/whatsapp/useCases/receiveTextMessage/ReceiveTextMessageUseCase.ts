import { AxiosResponse } from 'axios';

import { IBotMessagesTemplatesRepository } from '../../../bot/repositories/IBotMessagesTemplatesRepository';

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
    private botsMessagesTemplatesRepository: IBotMessagesTemplatesRepository
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

    const getBotMessageToSend = await this.botsMessagesTemplatesRepository.findByType('welcome-message');

    const botMessages: IMessageContent[] = getBotMessageToSend.content as {} as IMessageContent[];

    const promises = [];

    botMessages.forEach(async message => {

      console.log(message);

      let reply_message: ISendMessageData = null;

      if (message.type === 'text') {
        reply_message = {
          messaging_product: "whatsapp",
          to: from,
          text: {
            body: message.body.text
          },
        };
      }

      if (message.type === 'button') {
        reply_message = {
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: from,
          type: "interactive",
          interactive: {
            type: message.type,
            body: message.body,
            footer: message.footer,
            action: message.action
          }
        }
      }

      console.log(reply_message);

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