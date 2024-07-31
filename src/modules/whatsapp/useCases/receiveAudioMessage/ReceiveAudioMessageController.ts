import { FastifyReply, FastifyRequest } from 'fastify';

import { ReceiveAudioMessageUseCase } from './ReceiveAudioMessageUseCase';

import { IWebhookEventBody } from '../../types/webhookEventBody';

class ReceiveAudioMessageController {

  constructor(private receiveAudioMessageUseCase: ReceiveAudioMessageUseCase) { }

  async handle(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const requestBody = request.body as IWebhookEventBody;

    console.log(requestBody.entry[0].changes[0].value.messages[0]);

    const name = requestBody.entry[0].changes[0].value.contacts[0].profile.name;

    const phone_number_id = requestBody.entry[0].changes[0].value.metadata.phone_number_id;

    const from = requestBody.entry[0].changes[0].value.messages[0].from; //extract the phone number from the webhook payload

    const message_id = requestBody.entry[0].changes[0].value.messages[0].id;

    const audio = {
      id: requestBody.entry[0].changes[0].value.messages[0].audio.id,
      sha256: requestBody.entry[0].changes[0].value.messages[0].audio.id,
    }

    await this.receiveAudioMessageUseCase.execute({ name, phone_number_id, from, message_id, audio });

    return reply.status(200).send();
  }
}

export { ReceiveAudioMessageController };