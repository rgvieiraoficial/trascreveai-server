import { SessionTasks, Prisma } from '@prisma/client';

interface ISessionTasksRepository {
  create({ title, summary, status, stage, contact }: Prisma.SessionTasksCreateInput): Promise<SessionTasks>;
  findById(id: string): Promise<SessionTasks | null>;
  findOpenSessionTasksByContact(contact_id: string): Promise<SessionTasks | null>;
  list(): Promise<SessionTasks[]>;
  updateStatus(id: string, status: number): Promise<SessionTasks>;
  updateStage(id: string, stage: string): Promise<SessionTasks>;
}

export { ISessionTasksRepository };