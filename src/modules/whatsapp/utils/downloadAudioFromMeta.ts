import fs from 'fs';
import path from 'path';
import * as stream from 'stream';
import { promisify } from 'util';

import { graphApi } from '../../../lib/graphApi';

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

const pipeline = promisify(stream.pipeline);

const downloadAudioFromMeta = async (phone_number_id: string, audio_id: string): Promise<string> => {
  const token = process.env.WHATSAPP_TOKEN;

  const get_media_url = `/${audio_id}?phone_number_id=${phone_number_id}`;

  const header_config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  try {
    const media_url: IGetMediaURLData = await graphApi.get(get_media_url, header_config);

    const file_name = `audio_${Date.now().toString()}.ogg`;

    const file_path = path.resolve('tmp', 'media', 'audios', file_name);

    const url = media_url.data.url;

    const response = await graphApi.get(url, {
      responseType: 'stream',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'audio/ogg'
      }
    });
    await pipeline(response.data, fs.createWriteStream(file_name));
    console.log('Download Completed');

    return file_path;
  } catch (error) {
    console.error('Download audio pipeline failed', error);
  }
}


export default downloadAudioFromMeta;