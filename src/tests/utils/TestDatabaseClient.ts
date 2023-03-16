import { FakeTaskRepository } from "../../core/FakeTaskRepository"
import { Task } from "../../core/Task"
import { ITestClient } from "./ITestClient"

export class TestDatabaseClient implements ITestClient {
  public constructor(private readonly _taskRepository: FakeTaskRepository) {}

  public async getTasks(): Promise<Task[]> {
    return this._taskRepository._collection
  }
}


