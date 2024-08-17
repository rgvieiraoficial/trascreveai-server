import { SessionTasksRepository } from '../../repositories/implementations/SessionTasksRepository';

import { CloseAllSessionsTasksUseCase } from './CloseAllSessionsTasksUseCase';

import { CloseAllSessionsTasksController } from './CloseAllSessionsTasksController';

const sessionTasksRepository = new SessionTasksRepository();

const closeAllSessionsTasksUseCase = new CloseAllSessionsTasksUseCase(sessionTasksRepository);

const closeAllSessionsTasksController = new CloseAllSessionsTasksController(closeAllSessionsTasksUseCase);

export { closeAllSessionsTasksController };