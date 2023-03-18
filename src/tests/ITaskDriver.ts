import { Task } from "../core/Task"
import { TaskDto } from "../core/TaskDto"
import { IJestHooks } from "./IJestHooks"

export interface ITaskDriver extends IJestHooks {
  add(title: string): Promise<void>
  addTaskWithDeadline(amount: number, deadline: Date): Promise<void>
  getTasks(): Promise<Task[]>
  getTasksDueByDate(today: Date): Promise<TaskDto[]>
  setCurrentDate(date: Date): void
  beforeAll(): Promise<void>
}
