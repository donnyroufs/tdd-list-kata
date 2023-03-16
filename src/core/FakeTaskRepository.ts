import { ITaskRepository } from "./ITaskRepository"
import { Task } from "./Task"

export class FakeTaskRepository implements ITaskRepository {
  public collection: Task[] = []

  public async save(task: Task): Promise<void> {
    this.collection.push(task)
  }
}
