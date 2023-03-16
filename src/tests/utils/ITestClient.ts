import { Task } from "../../core/Task"

export interface ITestClient {
  addTask(task: Task): Promise<void>
  getTasks(): Promise<Task[]>
  dispose(): Promise<void>
  clearTasks(): Promise<void>
}
