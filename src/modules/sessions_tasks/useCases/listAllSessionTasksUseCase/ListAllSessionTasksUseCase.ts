import { SessionTasks } from '@prisma/client';

import { ISessionTasksRepository } from '../../repositories/ISessionTasksRepository';

class ListAllSessionTasksUseCase {

  constructor(
    private sessionTasksRepository: ISessionTasksRepository
  ) { }

  async execute(): Promise<SessionTasks[]> {
    const session_tasks = await this.sessionTasksRepository.list();

    return session_tasks;
  }
}

export { ListAllSessionTasksUseCase };