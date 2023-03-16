import { PrismaClient } from "@prisma/client"
import { ITaskRepository } from "../../core/ITaskRepository"
import { Task } from "../../core/Task"
import { TaskMapper } from "./TaskMapper"
import { DateRange } from "../../core/DateRange"

export class TaskRepository implements ITaskRepository {
  public constructor(private readonly _client: PrismaClient) {}

  public async save(task: Task): Promise<void> {
    const data = TaskMapper.toModel(task)
    await this._client.tasks.create({
      data,
    })
  }

  public async findTasksDueToday(date: DateRange): Promise<Task[]> {
    const tasks = await this._client.tasks.findMany({
      where: {
        deadline: {
          gte: date.from,
          lt: date.to,
        },
      },
    })

    return tasks.map(TaskMapper.toDomain)
  }
}
