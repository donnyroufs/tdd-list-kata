import { BeforeEach, Describe, Test } from "@jest-decorated/core"
import { CreateTaskUseCase } from "../../core/CreateTaskUseCase"
import { FakeTaskRepository } from "../../core/FakeTaskRepository"
import { ICreateTask } from "../ICreateTask"
import { TestCreateTaskRequestBuilder } from "../utils/TestCreateTaskRequestBuilder"
import { TestDatabaseClient } from "../utils/TestDatabaseClient"
import { TestTaskBuilder } from "../utils/TestTaskBuilder"

@Describe()
export class CreateTaskShould implements ICreateTask {
  private _db: TestDatabaseClient
  private _sut: CreateTaskUseCase

  @BeforeEach()
  public async setup(): Promise<void> {
    const fakeTasksRepo = new FakeTaskRepository()
    this._sut = new CreateTaskUseCase(fakeTasksRepo)
    this._db = new TestDatabaseClient(fakeTasksRepo)
  }

  @Test()
  public async CreateATask(): Promise<void> {
    const request = new TestCreateTaskRequestBuilder()
      .withTitle("my task")
      .build()

    await this._sut.execute(request)

    const expectedTask = new TestTaskBuilder().withTitle(request.title).build()
    const confirmation = await this._db.getTasks()

    expect(confirmation).toStrictEqual([expectedTask])
  }

  @Test()
  public async CreateATaskWithADeadline(): Promise<void> {
    const date = new Date()
    const request = new TestCreateTaskRequestBuilder()
      .withTitle("my task")
      .withDeadline(date)
      .build()

    await this._sut.execute(request)

    const expectedTask = new TestTaskBuilder()
      .withTitle(request.title)
      .withDeadline(request.deadline!)
      .build()
    const confirmation = await this._db.getTasks()

    expect(confirmation).toStrictEqual([expectedTask])
  }
}
