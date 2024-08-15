import { FastifyInstance, FastifyPluginOptions } from 'fastify';

import { createBotMessageTemplateController } from '../../modules/bot/useCases/createBotMessageTemplateUseCase';
import { deleteBotMessageTemplateController } from '../../modules/bot/useCases/deleteBotMessageTemplateUseCase';
import { listBotMessagesTemplatesController } from '../../modules/bot/useCases/listBotMessagesTemplatesUseCase';

async function botsRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.get('/messages', (request, reply) => {
    listBotMessagesTemplatesController.handle(request, reply);
  });

  fastify.post('/create-message', (request, reply) => {
    createBotMessageTemplateController.handle(request, reply);
  });

  fastify.delete('/delete-message', (request, reply) => {
    deleteBotMessageTemplateController.handle(request, reply);
  });
}

export { botsRoutes };