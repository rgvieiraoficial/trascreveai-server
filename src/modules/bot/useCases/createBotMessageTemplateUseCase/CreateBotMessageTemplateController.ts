import { FastifyRequest, FastifyReply } from 'fastify';

import { CreateBotMessageTemplateUseCase } from './CreateBotMessageTemplateUseCase';

interface IRquestBody {
  title: string;
  content: string;
  type: string;
}

class CreateBotMessageTemplateController {

  constructor(
    private createBotMessageTemplateUseCase: CreateBotMessageTemplateUseCase
  ) { }

  async handle(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const { title, content, type } = request.body as IRquestBody;

    await this.createBotMessageTemplateUseCase.execute({ title, content, type });

    return reply.status(200).send();
  }
}

export { CreateBotMessageTemplateController };