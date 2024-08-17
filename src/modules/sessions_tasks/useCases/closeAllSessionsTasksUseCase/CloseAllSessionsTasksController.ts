import { FastifyRequest, FastifyReply } from 'fastify';

import { CloseAllSessionsTasksUseCase } from './CloseAllSessionsTasksUseCase';

class CloseAllSessionsTasksController {

  constructor(
    private closeAllSessionsTasksUseCase: CloseAllSessionsTasksUseCase
  ) { }

  async handle(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    await this.closeAllSessionsTasksUseCase.execute();

    return reply.status(200).send();
  }
}

export { CloseAllSessionsTasksController };