import {
  Describe,
  BeforeEach,
  AfterAll,
  Test,
  BeforeAll,
} from "@jest-decorated/core"
import { BaseCreateTask } from "../../BaseCreateTask"
import { RealTaskDriver } from "../../drivers/RealTaskDriver"

@Describe()
export class CreateTaskShould extends BaseCreateTask {
  protected override driver = new RealTaskDriver()

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
}
