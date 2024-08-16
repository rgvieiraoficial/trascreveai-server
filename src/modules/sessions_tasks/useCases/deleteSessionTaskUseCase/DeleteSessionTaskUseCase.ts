import { ISessionTasksRepository } from '../../repositories/ISessionTasksRepository';

interface IRequest {
  id: string;
}

class DeleteSessionTaskUseCase {

  constructor(
    private sessionTasksRepository: ISessionTasksRepository
  ) { }

  async execute({ id }: IRequest): Promise<void> {
    await this.sessionTasksRepository.delete(id);
  }
}

export { DeleteSessionTaskUseCase };