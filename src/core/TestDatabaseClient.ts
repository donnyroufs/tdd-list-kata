import { FakeTaskRepository } from "./FakeTaskRepository"
import { Task } from "./Task"

export class TestDatabaseClient {
  public constructor(private readonly _taskRepository: FakeTaskRepository) {}

  public async getTasks(): Promise<Task[]> {
    return this._taskRepository._collection
  }
}
