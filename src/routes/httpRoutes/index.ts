import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

import { botsRoutes } from './bots.routes';
import { whatsappRoutes } from './whatsapp.routes';

async function appRoutes(fastify: FastifyInstance) {
  fastify.get('/', (request: FastifyRequest, reply: FastifyReply): FastifyReply => {
    return reply.send({ message: 'Everything is fine!' });
  });

  fastify.register(botsRoutes, { prefix: '/bots' });

  fastify.register(whatsappRoutes, { prefix: '/whatsapp' });
};

export { appRoutes };