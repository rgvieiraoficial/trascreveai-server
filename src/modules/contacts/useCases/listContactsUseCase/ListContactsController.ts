import { FastifyRequest, FastifyReply } from 'fastify';

import { ListContactsUseCaseUseCase } from './ListContactsUseCaseUseCase';

class ListContactsController {

  constructor(
    private listContactsUseCaseUseCase: ListContactsUseCaseUseCase
  ) { }

  async handle(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const contacts = await this.listContactsUseCaseUseCase.execute();

    return reply.status(200).send(contacts);
  }
}

export { ListContactsController };