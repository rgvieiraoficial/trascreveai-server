import { FastifyInstance, FastifyPluginOptions } from 'fastify';

import { deleteSessionTaskController } from '../../modules/sessions_tasks/useCases/deleteSessionTaskUseCase';
import { listAllSessionTasksController } from '../../modules/sessions_tasks/useCases/listAllSessionTasksUseCase';

async function sessionsTasksRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.get('/', (request, reply) => {
    listAllSessionTasksController.handle(request, reply);
  });

  fastify.delete('/delete', (request, reply) => {
    deleteSessionTaskController.handle(request, reply);
  });
}

export { sessionsTasksRoutes };