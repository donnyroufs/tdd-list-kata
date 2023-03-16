import { Task } from "../core/Task"

export interface ICreateTaskDriver {
  add(amount: number): Promise<void>
  getTasks(): Promise<Task[]>
}

export abstract class BaseCreateTask {
  protected driver: ICreateTaskDriver

  public async CreateATask(): Promise<void> {
    await this.driver.add(1)
    const tasks = await this.driver.getTasks()

    expect(tasks).toHaveLength(1)
  }
}
