import { ITaskDriver } from "./drivers/ITaskDriver"

export abstract class BaseCreateTask {
  protected driver: ITaskDriver

  public async CreateATask(): Promise<void> {
    await this.driver.add(1)
    const tasks = await this.driver.getTasks()

    expect(tasks).toHaveLength(1)
    const task = tasks.at(0)!
    expect(task.title).toBeDefined()
    expect(task.deadline).toBeDefined()
  }
}
