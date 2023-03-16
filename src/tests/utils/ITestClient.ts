import { Task } from "../../core/Task"

export interface ITestClient {
  getTasks(): Promise<Task[]>
}
