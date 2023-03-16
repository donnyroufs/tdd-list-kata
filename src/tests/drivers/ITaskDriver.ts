import { Task } from "../../core/Task"
import { TaskDto } from "../../core/TaskDto"

export interface ITaskDriver {
  add(amount: number): Promise<void>
  addTaskWithDeadline(amount: number, deadline: Date): Promise<void>
  getTasks(): Promise<Task[]>
  getTasksDueByDate(today: Date): Promise<TaskDto[]>
  setCurrentDate(date: Date): void
}
