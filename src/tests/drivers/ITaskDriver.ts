import { Task } from "../../core/Task"

export interface ITaskDriver {
  add(amount: number): Promise<void>
  addTaskWithDeadline(amount: number, deadline: Date): Promise<void>
  getTasks(): Promise<Task[]>
  getTasksDueByDate(today: Date): Promise<Task[]>
  setCurrentDate(date: Date): void
}
