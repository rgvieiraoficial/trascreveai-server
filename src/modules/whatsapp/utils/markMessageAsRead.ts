import { AxiosResponse } from 'axios';

import { graphApi } from '../../../lib/graphApi';

import { IMessageContent, ISendMessageData } from '../types/whastsappTypes';

const markMessageAsRead = async (phone_number_id: string, message_id: string) => {
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
}


export default markMessageAsRead;