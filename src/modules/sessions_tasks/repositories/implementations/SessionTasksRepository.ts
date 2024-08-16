import { SessionTasks, Prisma } from '@prisma/client';

import { ISessionTasksRepository } from '../ISessionTasksRepository';

import { prisma } from '../../../../lib/prisma';

class SessionTasksRepository implements ISessionTasksRepository {

  async create({ title, summary, status, stage, contact, }: Prisma.SessionTasksCreateInput): Promise<SessionTasks> {

    const session_tasks = await prisma.sessionTasks.create({
      data: {
        title,
        summary,
        status,
        stage,
        contact,
      }
    });

    return session_tasks;
  }

  async list(): Promise<SessionTasks[]> {
    const session_tasks = await prisma.sessionTasks.findMany();

    return session_tasks;
  }

  async findById(id: string): Promise<SessionTasks | null> {
    const call = await prisma.sessionTasks.findUnique({
      where: {
        id
      }
    });

    return call;
  }

  async findOpenSessionTasksByContact(contactId: string): Promise<SessionTasks> {
    const session_task = await prisma.sessionTasks.findFirst({
      where: {
        contactId,
        AND: {
          status: 1
        }
      }
    });

    return session_task;
  }

  async updateStatus(id: string, status: number): Promise<SessionTasks> {

    const session_task = await prisma.sessionTasks.update({
      data: {
        status
      },
      where: {
        id
      }
    })

    return session_task;
  }

  async updateStage(id: string, stage: string): Promise<SessionTasks> {

    const session_task = await prisma.sessionTasks.update({
      data: {
        stage
      },
      where: {
        id
      }
    })

    return session_task;
  }
}

export { SessionTasksRepository };