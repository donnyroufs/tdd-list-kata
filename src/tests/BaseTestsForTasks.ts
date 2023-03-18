import { ITaskDriver } from "./ITaskDriver"
import { TestDateFactory } from "./utils/TestDateFactory"

export abstract class BaseTestsForTasks {
  protected driver: ITaskDriver

  public async CreateATask(): Promise<void> {
    const TITLE = "my title"
    await this.driver.add(TITLE)
    const tasks = await this.driver.getTasks()

    expect(tasks.at(0)!.title.value).toEqual(TITLE)
  }

  public async ShowTasksDueToday(): Promise<void> {
    const today = TestDateFactory.today()
    this.driver.setCurrentDate(today)

    const tomorrow = TestDateFactory.tomorrow()
    await this.driver.addTaskWithDeadline(2, today)
    await this.driver.addTaskWithDeadline(1, tomorrow)

    const tasks = await this.driver.getTasksDueByDate(today)
    expect(tasks).toBeArrayOfSize(2)
    expect(tasks.at(0)!.deadline).toEqual(today)
    expect(tasks.at(1)!.deadline).toEqual(today)
  }
}
