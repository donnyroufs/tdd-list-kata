import { BeforeEach, Describe, Test } from "@jest-decorated/core"
import { BaseTestsForTasks } from "../BaseTestsForTasks"
import { FakeTaskDriver } from "../drivers/FakeTaskDriver"

@Describe()
export class TaskUseCasesShould extends BaseTestsForTasks {
  protected override driver = new FakeTaskDriver()

  @BeforeEach()
  public beforeEach(): void {
    this.driver = new FakeTaskDriver()
  }

  @Test()
  public override async CreateATask(): Promise<void> {
    await super.CreateATask()
  }

  @Test()
  public override async ShowTasksDueToday(): Promise<void> {
    await super.ShowTasksDueToday()
  }
}
