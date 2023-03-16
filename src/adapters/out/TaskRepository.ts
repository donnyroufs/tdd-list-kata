import { PrismaClient } from "@prisma/client"
import { ITaskRepository } from "../../core/ITaskRepository"
import { Task } from "../../core/Task"
import { TaskMapper } from "./TaskMapper"

export class TaskRepository implements ITaskRepository {
  public constructor(private readonly _client: PrismaClient) {}

  public async save(task: Task): Promise<void> {
    const data = TaskMapper.toModel(task)
    await this._client.tasks.create({
      data,
    })
  }
}
