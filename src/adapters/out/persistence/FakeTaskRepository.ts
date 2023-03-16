import { ITaskRepository } from "../../../core/ITaskRepository"
import { Task } from "../../../core/Task"
import { DateRange } from "../../../core/DateRange"

export class FakeTaskRepository implements ITaskRepository {
  public collection: Task[] = []

  public async save(task: Task): Promise<void> {
    this.collection.push(task)
  }

  public async findTasksDueToday(today: DateRange): Promise<Task[]> {
    return this.collection
      .filter((task) => task.deadline != null)
      .filter(
        (task) =>
          task.deadline!.value >= today.from && task.deadline!.value <= today.to
      )
  }
}
