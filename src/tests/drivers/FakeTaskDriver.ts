import { Task } from "../../core/Task"
import { TestTaskBuilder } from "../utils/TestTaskBuilder"
import { FakeTaskRepository } from "../../adapters/out/FakeTaskRepository"
import { ITaskDriver } from "./ITaskDriver"

export class FakeTaskDriver implements ITaskDriver {
  private _repo: FakeTaskRepository

  public constructor() {
    this._repo = new FakeTaskRepository()
  }

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
