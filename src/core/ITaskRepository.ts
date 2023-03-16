import { Task } from "./Task"

export interface ITaskRepository {
  save(task: Task): Promise<void>
}
