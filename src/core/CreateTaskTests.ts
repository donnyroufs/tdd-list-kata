import { BeforeAll, Describe, Test } from "@jest-decorated/core"
import { CreateTaskRequest, CreateTaskUseCase } from "./CreateTaskUseCase"
import { FakeTaskRepository } from "./FakeTaskRepository"
import { Task } from "./Task"
import { TestDatabaseClient } from "./TestDatabaseClient"

@Describe()
export class CreateTaskShould {
  private _db: TestDatabaseClient
  private _sut: CreateTaskUseCase

  @BeforeAll()
  public async setup(): Promise<void> {
    const fakeTasksRepo = new FakeTaskRepository()
    this._sut = new CreateTaskUseCase(fakeTasksRepo)
    this._db = new TestDatabaseClient(fakeTasksRepo)
  }

  @Test()
  public async CreateATask(): Promise<void> {
    const request = new CreateTaskRequest("my task")

    await this._sut.execute(request)

    const expectedTask = new Task(request.title)
    const confirmation = await this._db.getTasks()

    expect(confirmation).toStrictEqual([expectedTask])
  }
}
