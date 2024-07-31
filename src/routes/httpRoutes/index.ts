import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

async function appRoutes(fastify: FastifyInstance) {
  fastify.get('/', (request: FastifyRequest, reply: FastifyReply): FastifyReply => {
    return reply.send({ message: 'Everything is fine!' });
  });
};

export { appRoutes };