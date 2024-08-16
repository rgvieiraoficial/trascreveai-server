import fs from 'fs';
import * as stream from 'stream';
import { promisify } from 'util';

import { graphApi } from '../../../lib/graphApi';

const pipeline = promisify(stream.pipeline);

const downloadAudioFromMeta = async (url: string, file_name: string) => {
  const token = process.env.WHATSAPP_TOKEN;

  try {
    const response = await graphApi.get(url, {
      responseType: 'stream',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'audio/ogg'
      }
    });
    await pipeline(response.data, fs.createWriteStream(file_name));
    console.log('Download Completed');
  } catch (error) {
    console.error('Download audio pipeline failed', error);
  }
}


export default downloadAudioFromMeta;