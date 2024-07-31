import path from 'path';

import { AxiosResponse } from 'axios';

import { graphApi } from '../../../../lib/graphApi';

import { audioTranscribe } from '../../../../utils/audioTranscribe';
import downloadAudioFromMeta from '../../../../utils/downloadAudioFromMeta';

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

interface IGetMediaURLData {
  data: {
    messaging_product: string
    id: string,
    file_size: number,
    mime_type: string,
    url: string;
    sha256: string,
  }
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

class ReceiveAudioMessageUseCase {

  async execute({ name, phone_number_id, from, message_id, audio }: IRequest): Promise<void> {
    console.log(`ID: ${message_id}`);

    console.log(`Audio ID: ${audio.id}`);

    const token = process.env.WHATSAPP_TOKEN;

    const url = `/${phone_number_id}/messages?access_token=${token}`;

    const fist_reply_data: ISendMessageData = {
      messaging_product: "whatsapp",
      to: from,
      text: {
        body: 'Transcrevendo áudio...'
      },
    };

    try {
      await graphApi.post<ISendMessageData, AxiosResponse<ISendMessageData>>(url, fist_reply_data);
    } catch (err) {
      console.log(err.message);
    }

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

    const get_media_url = `/${audio.id}?phone_number_id=${phone_number_id}`;

    try {
      const media_url: IGetMediaURLData = await graphApi.get(get_media_url, header_config);

      const file_name = `audio_${Date.now().toString()}.ogg`;

      const file_path = path.resolve('src', 'tmp', 'media', 'audios', file_name);

      await downloadAudioFromMeta(media_url.data.url, file_path);

      const transcript = await audioTranscribe(file_path);

      const reply_data: ISendMessageData = {
        messaging_product: "whatsapp",
        to: from,
        text: {
          body: transcript
        },
      };

      try {
        await graphApi.post<ISendMessageData, AxiosResponse<ISendMessageData>>(url, reply_data);
      } catch (err) {
        console.log(err.message);
      }
    } catch (err) {
      console.log(err.message);
    }
  }
}

export { ReceiveAudioMessageUseCase };