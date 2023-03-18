import { BeforeEach, Describe, Test } from "@jest-decorated/core"
import { BaseTestsForTasks } from "../BaseTestsForTasks"
import { UseCasesTaskDriver } from "./UseCasesTaskDriver"

@Describe()
export class TaskUseCasesShould extends BaseTestsForTasks {
  public constructor() {
    super(new UseCasesTaskDriver())
  }

  @BeforeEach()
  public beforeEach(): void {
    this.driver = new UseCasesTaskDriver()
  }

  @Test()
  public override CreateATask = (): Promise<void> => super.CreateATask()

  @Test()
  public override ShowTasksDueToday = (): Promise<void> =>
    super.ShowTasksDueToday()
}
