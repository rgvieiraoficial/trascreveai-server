import { ISessionTasksRepository } from '../../repositories/ISessionTasksRepository';

interface IRequest {
  id: string;
}

class CloseAllSessionsTasksUseCase {

  constructor(
    private sessionTasksRepository: ISessionTasksRepository
  ) { }

  async execute(): Promise<void> {
    await this.sessionTasksRepository.closeAll();
  }
}

export { CloseAllSessionsTasksUseCase };