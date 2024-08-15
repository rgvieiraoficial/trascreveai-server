import { FastifyRequest, FastifyReply } from 'fastify';

import { ListBotMessagesTemplatesUseCase } from './ListBotMessagesTemplatesUseCase';

class ListBotMessagesTemplatesController {

  constructor(
    private listBotMessagesTemplatesUseCase: ListBotMessagesTemplatesUseCase
  ) { }

  async handle(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const messagesTemplates = await this.listBotMessagesTemplatesUseCase.execute();

    return reply.status(200).send(messagesTemplates);
  }
}

export { ListBotMessagesTemplatesController };