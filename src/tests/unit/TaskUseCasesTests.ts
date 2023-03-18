import { BeforeEach, Describe, Test } from "@jest-decorated/core"
import { BaseTestsForTasks } from "../BaseTestsForTasks"
import { UseCasesTaskDriver } from "../drivers/UseCasesTaskDriver"

@Describe()
export class TaskUseCasesShould extends BaseTestsForTasks {
  protected override driver = new UseCasesTaskDriver()

  @BeforeEach()
  public beforeEach(): void {
    this.driver = new UseCasesTaskDriver()
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
