import { FastifyRequest, FastifyReply } from 'fastify';

import { DeleteBotMessageTemplateUseCase } from './DeleteBotMessageTemplateUseCase';

interface IRquestBody {
  id: string;
}

class DeleteBotMessageTemplateController {

  constructor(
    private deleteBotMessageTemplateUseCase: DeleteBotMessageTemplateUseCase
  ) { }

  async handle(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const { id } = request.body as IRquestBody;

    await this.deleteBotMessageTemplateUseCase.execute({ id });

    return reply.status(200).send();
  }
}

export { DeleteBotMessageTemplateController };