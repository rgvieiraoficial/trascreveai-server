import { FastifyInstance, FastifyPluginOptions } from 'fastify';

import { selectUseCaseBasedOnEventTypeController } from '../../modules/whatsapp/useCases/selectUseCaseBasedOnEventTypeController';
import { verifyWebhookController } from '../../modules/whatsapp/useCases/verifyWebhook';

interface IEvent {
  entry: [
    {
      changes: [
        {
          field: string
        }
      ]
    }
  ]
}

async function whatsappRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.get('/webhook', (request, reply) => {
    verifyWebhookController.handle(request, reply);
  });

  fastify.post('/webhook', (request, reply) => {
    const event = request.body as IEvent;

    if (event.entry[0].changes[0].field == 'messages') {
      try {
        selectUseCaseBasedOnEventTypeController.handle(request, reply);
      } catch (error) {
        console.error('Error processing message:', error);
        reply.status(400).send('Error processing message');
      }
    }
  });
}

export { whatsappRoutes };