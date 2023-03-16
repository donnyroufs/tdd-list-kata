import { PrismaClient } from "@prisma/client"
import { ITaskRepository } from "../../core/ITaskRepository"
import { Task } from "../../core/Task"

export class TaskRepository implements ITaskRepository {
  public constructor(private readonly _client: PrismaClient) {}

  public async save(task: Task): Promise<void> {
    await this._client.tasks.create({
      data: {
        title: task.title,
        deadline: task.deadline,
      },
    })
  }
}
