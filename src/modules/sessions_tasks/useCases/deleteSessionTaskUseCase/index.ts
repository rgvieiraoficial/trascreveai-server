import { SessionTasksRepository } from '../../repositories/implementations/SessionTasksRepository';

import { DeleteSessionTaskUseCase } from './DeleteSessionTaskUseCase';

import { DeleteSessionTaskController } from './DeleteSessionTaskController';

const sessionTasksRepository = new SessionTasksRepository();

const deleteSessionTaskUseCase = new DeleteSessionTaskUseCase(sessionTasksRepository);

const deleteSessionTaskController = new DeleteSessionTaskController(deleteSessionTaskUseCase);

export { deleteSessionTaskController };