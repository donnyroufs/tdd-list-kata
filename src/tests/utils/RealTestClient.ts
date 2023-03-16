import { PrismaClient } from "@prisma/client"
import { Task } from "../../core/Task"
import { ITestClient } from "./ITestClient"

export class RealTestClient implements ITestClient {
  public constructor(private readonly _client: PrismaClient) {}

  public async getTasks(): Promise<Task[]> {
    const tasks = await this._client.tasks.findMany()

    return tasks.map(
      (task) =>
        new Task(task.title, task.deadline === null ? undefined : task.deadline)
    )
  }

  public async dispose(): Promise<void> {
    await this._client.$disconnect()
  }

  public async clearTasks(): Promise<void> {
    await this._client.tasks.deleteMany()
  }
}
