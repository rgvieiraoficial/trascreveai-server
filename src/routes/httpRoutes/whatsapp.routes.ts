import { FastifyInstance, FastifyPluginOptions } from 'fastify';

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
}

export { whatsappRoutes };