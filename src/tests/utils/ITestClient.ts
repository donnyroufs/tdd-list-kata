import { Task } from "../../core/Task"

export interface ITestClient {
  getTasks(): Promise<Task[]>
  dispose(): Promise<void>
  clearTasks(): Promise<void>
}
