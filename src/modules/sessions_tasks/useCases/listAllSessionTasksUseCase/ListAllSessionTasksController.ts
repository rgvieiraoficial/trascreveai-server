import { FastifyRequest, FastifyReply } from 'fastify';

import { ListAllSessionTasksUseCase } from './ListAllSessionTasksUseCase';

class ListAllSessionTasksController {

  constructor(
    private listAllSessionTasksUseCase: ListAllSessionTasksUseCase
  ) { }

  async handle(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const session_tasks = await this.listAllSessionTasksUseCase.execute();

    return reply.status(200).send(session_tasks);
  }
}

export { ListAllSessionTasksController };