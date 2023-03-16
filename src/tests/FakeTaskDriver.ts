import { Task } from "../core/Task"
import { TestTaskBuilder } from "./utils/TestTaskBuilder"
import { ICreateTaskDriver } from "./BaseCreateTask"
import { FakeTaskRepository } from "../adapters/out/FakeTaskRepository"

export class FakeTaskDriver implements ICreateTaskDriver {
  public constructor(private readonly _repo: FakeTaskRepository) {}

  public async add(amount: number): Promise<void> {
    for (let i = 0; i < amount; i++) {
      const task = new TestTaskBuilder()
        .withTitle(Math.random().toString())
        .withDeadline(new Date())
        .build()

      await this._repo.save(task)
    }
  }

  public async getTasks(): Promise<Task[]> {
    return this._repo.collection
  }
}
