import { FastifyReply, FastifyRequest } from 'fastify';

import { ReceiveTextMessageUseCase } from './ReceiveTextMessageUseCase';

import { IWebhookEventBody } from '../../types/webhookEventBody';

class ReceiveTextMessageController {

  constructor(private receiveMessageWebhookEvent: ReceiveTextMessageUseCase) { }

  async handle(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const requestBody = request.body as IWebhookEventBody;

    const name = requestBody.entry[0].changes[0].value.contacts[0].profile.name;

    const phone_number_id = requestBody.entry[0].changes[0].value.metadata.phone_number_id;

    const from = requestBody.entry[0].changes[0].value.messages[0].from; //extract the phone number from the webhook payload

    const message_id = requestBody.entry[0].changes[0].value.messages[0].id;

    const message_body = requestBody.entry[0].changes[0].value.messages[0].text.body; //extract the message text from the webhook payload

    await this.receiveMessageWebhookEvent.execute({ name, phone_number_id, from, message_id, message_body });


    return reply.status(200).send();
  }
}

export { ReceiveTextMessageController };