import { SessionTasksRepository } from '../../repositories/implementations/SessionTasksRepository';

import { ListAllSessionTasksUseCase } from './ListAllSessionTasksUseCase';

import { ListAllSessionTasksController } from './ListAllSessionTasksController';

const sessionTasksRepository = new SessionTasksRepository();

const listAllSessionTasksUseCase = new ListAllSessionTasksUseCase(sessionTasksRepository);

const listAllSessionTasksController = new ListAllSessionTasksController(listAllSessionTasksUseCase);

export { listAllSessionTasksController };