import {
  Describe,
  BeforeEach,
  AfterAll,
  Test,
  BeforeAll,
} from "@jest-decorated/core"
import { BaseTestsForTasks } from "../../BaseTestsForTasks"
import { ControllerTaskDriver } from "../ControllerTaskDriver"

@Describe()
export class TaskControllerShould extends BaseTestsForTasks {
  protected override driver = new ControllerTaskDriver()

  @BeforeAll()
  public beforeAll = (): Promise<void> => this.driver.beforeAll()

  @BeforeEach()
  public beforeEach = (): Promise<void> => this.driver.beforeEach()

  @AfterAll()
  public dispose = (): Promise<void> => this.driver.afterAll()

  @Test()
  public async CreateATask(): Promise<void> {
    await super.CreateATask()
  }

  @Test()
  public async ShowTasksDueToday(): Promise<void> {
    await super.ShowTasksDueToday()
  }
}
