import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { listContactsController } from '../../modules/contacts/useCases/listContactsUseCase';


async function contactsRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.get('/', (request, reply) => {
    listContactsController.handle(request, reply);
  });
}

export { contactsRoutes };