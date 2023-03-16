import { Task } from "../../core/Task"

export interface ITaskDriver {
  add(amount: number): Promise<void>
  getTasks(): Promise<Task[]>
}
