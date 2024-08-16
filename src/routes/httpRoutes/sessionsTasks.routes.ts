import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { listAllSessionTasksController } from '../../modules/sessions_tasks/useCases/listAllSessionTasksUseCase';

async function sessionsTasksRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.get('/', (request, reply) => {
    listAllSessionTasksController.handle(request, reply);
  });
}

export { sessionsTasksRoutes };