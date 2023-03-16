import { ITaskRepository } from "../../core/ITaskRepository"
import { Task } from "../../core/Task"

export class FakeTaskRepository implements ITaskRepository {
  public collection: Task[] = []

  public async save(task: Task): Promise<void> {
    this.collection.push(task)
  }
}
