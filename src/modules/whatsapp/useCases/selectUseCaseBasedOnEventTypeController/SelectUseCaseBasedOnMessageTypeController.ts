import { FastifyReply, FastifyRequest } from 'fastify';

import { IWebhookEventBody } from '../../types/webhookEventBody';

import { receiveTextMessageController } from '../receiveTextMessage';
import { receiveAudioMessageController } from '../receiveAudioMessage';

class SelectUseCaseBasedOnEventTypeController {

  private useCases = [
    {
      type: 'text',
      useCase: receiveTextMessageController
    },
    {
      type: 'audio',
      useCase: receiveAudioMessageController
    }
  ];

  constructor() { }

  async handle(request: FastifyRequest, reply: FastifyReply): Promise<any> {
    const requestBody = request.body as IWebhookEventBody;

    if (requestBody.entry[0].changes[0].value.contacts) {
      const message_type = requestBody.entry[0].changes[0].value.messages[0].type;

      const findUseCase = this.useCases.find(useCase => useCase.type === message_type);

      if (findUseCase) {
        const { useCase } = findUseCase;

        useCase.handle(request, reply);
      } else {
        console.log(`No useCase found for message type: ${message_type}`);
      }
    }
  }
}

export { SelectUseCaseBasedOnEventTypeController };