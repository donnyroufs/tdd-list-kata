import { BeforeEach, Describe, Test } from "@jest-decorated/core"
import { BaseCreateTask } from "../BaseCreateTask"
import { FakeTaskDriver } from "../drivers/FakeTaskDriver"

@Describe()
export class CreateTaskShould extends BaseCreateTask {
  protected override driver = new FakeTaskDriver()

  @BeforeEach()
  public beforeEach(): void {
    this.driver = new FakeTaskDriver()
  }

  @Test()
  public override async CreateATask(): Promise<void> {
    await super.CreateATask()
  }
}
