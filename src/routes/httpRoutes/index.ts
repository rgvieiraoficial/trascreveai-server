import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

import { whatsappRoutes } from './whatsapp.routes';

async function appRoutes(fastify: FastifyInstance) {
  fastify.get('/', (request: FastifyRequest, reply: FastifyReply): FastifyReply => {
    return reply.send({ message: 'Everything is fine!' });
  });

  fastify.register(whatsappRoutes, { prefix: '/whatsapp' });
};

export { appRoutes };