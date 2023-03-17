import { ITaskDriver } from "./drivers/ITaskDriver"
import { TestDateFactory } from "./utils/TestDateFactory"

export abstract class BaseTestsForTasks {
  protected driver: ITaskDriver

  public async CreateATask(): Promise<void> {
    await this.driver.add(1)
    const tasks = await this.driver.getTasks()

    expect(tasks).toHaveLength(1)
    const task = tasks.at(0)!
    expect(task.title).toBeDefined()
    expect(task.deadline).toBeDefined()
  }

  public async ShowTasksDueToday(): Promise<void> {
    const today = TestDateFactory.today()
    this.driver.setCurrentDate(today)

    const tomorrow = TestDateFactory.tomorrow()
    await this.driver.addTaskWithDeadline(2, today)
    await this.driver.addTaskWithDeadline(1, tomorrow)

    const tasks = await this.driver.getTasksDueByDate(today)
    expect(tasks).toBeArrayOfSize(2)
  }
}
