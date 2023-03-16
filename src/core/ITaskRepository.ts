import { Task } from "./Task"
import { DateRange } from "./DateRange"

export interface ITaskRepository {
  save(task: Task): Promise<void>
  findTasksDueToday(today: DateRange): Promise<Task[]>
}
