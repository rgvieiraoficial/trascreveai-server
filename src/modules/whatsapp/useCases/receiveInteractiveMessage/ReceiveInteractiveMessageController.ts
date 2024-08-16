import { FastifyReply, FastifyRequest } from 'fastify';

import { ReceiveInteractiveMessageUseCase } from './ReceiveInteractiveMessageUseCase';

import { IWebhookEventBody } from '../../types/webhookEventBody';

class ReceiveInteractiveMessageController {

  constructor(private receiveMessageWebhookEvent: ReceiveInteractiveMessageUseCase) { }

  async handle(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const requestBody = request.body as IWebhookEventBody;

    const name = requestBody.entry[0].changes[0].value.contacts[0].profile.name;

    const phone_number_id = requestBody.entry[0].changes[0].value.metadata.phone_number_id;

    const from = requestBody.entry[0].changes[0].value.messages[0].from; //extract the phone number from the webhook payload

    const interactiveType = requestBody.entry[0].changes[0].value.messages[0].interactive.type;

    const message_id = requestBody.entry[0].changes[0].value.messages[0].id;

    const message_body = (interactiveType === 'list_reply') ? requestBody.entry[0].changes[0].value.messages[0].interactive.list_reply.id : requestBody.entry[0].changes[0].value.messages[0].interactive.button_reply.id;

    await this.receiveMessageWebhookEvent.execute({ name, phone_number_id, from, message_id, message_body });

    return reply.status(200).send();
  }
}

export { ReceiveInteractiveMessageController };