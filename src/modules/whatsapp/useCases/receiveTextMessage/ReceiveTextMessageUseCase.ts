import { AxiosResponse } from 'axios';

import { graphApi } from '../../../../lib/graphApi';

interface IRequest {
  name: string;
  phone_number_id: string;
  from: string;
  message_id: string;
  message_body: string;
}

interface ISendMessageData {
  messaging_product: string;
  to?: string;
  status?: string;
  text?: {
    body: string;
  };
  message_id?: string;
  messages?: [
    {
      id: string;
    }
  ]
}


class ReceiveTextMessageUseCase {

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

    const reply_message_one: ISendMessageData = {
      messaging_product: "whatsapp",
      to: from,
      text: {
        body: 'Olá, tudo bem? 😃\n\nSou o seu Assistente para ajudar com tarefas de transcrição de áudio 😎'
      },
    };

    try {
      await graphApi.post<ISendMessageData, AxiosResponse<ISendMessageData>>(url, reply_message_one);
    } catch (err) {
      console.log(err.message);
    }

    const reply_message_two: ISendMessageData = {
      messaging_product: "whatsapp",
      to: from,
      text: {
        body: 'Para transcrever um áudio basta envia-lo para mim a qualquer momento, que realizo a transcrição para você 😉'
      },
    };

    try {
      await graphApi.post<ISendMessageData, AxiosResponse<ISendMessageData>>(url, reply_message_two);
    } catch (err) {
      console.log(err.message);
    }
  }
}

export { ReceiveTextMessageUseCase };