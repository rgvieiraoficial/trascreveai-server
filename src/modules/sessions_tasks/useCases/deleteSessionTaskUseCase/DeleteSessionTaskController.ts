import { FastifyRequest, FastifyReply } from 'fastify';

import { DeleteSessionTaskUseCase } from './DeleteSessionTaskUseCase';

interface IRquestBody {
  id: string;
}

class DeleteSessionTaskController {

  constructor(
    private deleteSessionTaskUseCase: DeleteSessionTaskUseCase
  ) { }

  async handle(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const { id } = request.body as IRquestBody;

    await this.deleteSessionTaskUseCase.execute({ id });

    return reply.status(200).send();
  }
}

export { DeleteSessionTaskController };