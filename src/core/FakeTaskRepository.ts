import { ITaskRepository } from "./ITaskRepository"
import { Task } from "./Task"

export class FakeTaskRepository implements ITaskRepository {
  public readonly _collection: Task[] = []

  public async save(task: Task): Promise<void> {
    this._collection.push(task)
  }
}
