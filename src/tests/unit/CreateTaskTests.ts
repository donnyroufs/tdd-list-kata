import { BeforeEach, Describe, Test } from "@jest-decorated/core"
import { FakeTaskRepository } from "../../adapters/out/FakeTaskRepository"
import { BaseCreateTask } from "../BaseCreateTask"
import { FakeTaskDriver } from "../FakeTaskDriver"

@Describe()
export class CreateTaskShould extends BaseCreateTask {
  @BeforeEach()
  public async setup(): Promise<void> {
    this.driver = new FakeTaskDriver(new FakeTaskRepository())
  }

  @Test()
  public override async CreateATask(): Promise<void> {
    await super.CreateATask()
  }
}
