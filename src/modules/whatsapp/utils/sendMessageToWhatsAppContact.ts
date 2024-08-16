import { AxiosResponse } from 'axios';

import { graphApi } from '../../../lib/graphApi';

import { IMessageContent, ISendMessageData } from '../types/whastsappTypes';

const sendMessageToWhatsAppContact = async (phone_number_id: string, whatsapp_number: string, botMessages: IMessageContent[]) => {
  const token = process.env.WHATSAPP_TOKEN;

  const url = `/${phone_number_id}/messages?access_token=${token}`;

  const promises = [];

  botMessages.forEach(async message => {
    let reply_message: ISendMessageData = null;

    if (message.type === 'text') {
      reply_message = {
        messaging_product: "whatsapp",
        to: whatsapp_number,
        text: {
          body: message.body.text
        },
      };
    }

    if (message.type === 'button') {
      reply_message = {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: whatsapp_number,
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
        to: whatsapp_number,
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


export default sendMessageToWhatsAppContact;