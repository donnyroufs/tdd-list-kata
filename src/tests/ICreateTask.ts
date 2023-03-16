export interface ICreateTask {
  CreateATask(): Promise<void>
  CreateATaskWithADeadline(): Promise<void>
}
