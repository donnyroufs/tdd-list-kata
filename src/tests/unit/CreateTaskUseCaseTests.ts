import { Describe, Test } from "@jest-decorated/core"
import { mock } from "jest-mock-extended"

import { CreateTaskUseCase } from "../../core/CreateTaskUseCase"
import { FakeTaskRepository } from "../../adapters/out/persistence/FakeTaskRepository"
import { IDateService } from "../../core/IDateService"
import { TestCreateTaskRequestBuilder } from "../utils/TestCreateTaskRequestBuilder"
import { TestDateFactory } from "../utils/TestDateFactory"

@Describe()
export class CreateTaskUseCaseShould {
  @Test()
  public async NotCreateATaskWhenDeadlineOlderThanToday(): Promise<void> {
    const fakeRepo = new FakeTaskRepository()
    const stubDateService = mock<IDateService>()
    stubDateService.getTodaysDate.mockReturnValue(TestDateFactory.today())

    const sut = new CreateTaskUseCase(fakeRepo, stubDateService)

    const act = (): Promise<void> =>
      sut.execute(
        new TestCreateTaskRequestBuilder()
          .withDeadline(TestDateFactory.yesterday())
          .build()
      )

    await expect(act).rejects.toThrowError()
  }
}
