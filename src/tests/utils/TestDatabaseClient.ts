import { FakeTaskRepository } from "../../adapters/out/FakeTaskRepository"
import { Task } from "../../core/Task"
import { ITestClient } from "./ITestClient"

export class TestDatabaseClient implements ITestClient {
  public constructor(private readonly _taskRepository: FakeTaskRepository) {}

  public async addTask(task: Task): Promise<void> {
    this._taskRepository.collection.push(task)
  }

  public async getTasks(): Promise<Task[]> {
    return this._taskRepository.collection
  }

  public async clearTasks(): Promise<void> {
    this._taskRepository.collection = []
  }

  public async dispose(): Promise<void> {}
}
